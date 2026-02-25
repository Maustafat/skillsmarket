// ============================================
// Supabase Auth Layer for Skills Marketplace
// ============================================

const SUPABASE_URL = 'https://amjhxaautglxhwbuqlmg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtamh4YWF1dGdseGh3YnVxbG1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMTIxNjMsImV4cCI6MjA4NzU4ODE2M30.kh1q1aYnoTw6v_Q5LRatr2K0DmD6FRXyWfWGwnPkcys';

function loadApp() {
  const script = document.createElement('script');
  script.type = 'module';
  script.src = 'app.js';
  document.body.appendChild(script);
}

// Guard: if Supabase CDN didn't load, just run the app in demo mode
if (!window.supabase) {
  console.warn('Supabase not loaded — running in demo mode');
  loadApp();
} else {
  initAuth();
}

async function initAuth() {
  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  // Make accessible to other functions
  window.__supabase = supabase;

  // Check for existing session and populate currentUser
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session && window.__SKILLS_DATA) {
      const user = await buildUserObject(supabase, session.user);
      window.__SKILLS_DATA.currentUser = user;
      if (!window.__SKILLS_DATA.users.find(u => u.email === user.email)) {
        window.__SKILLS_DATA.users.push(user);
      }
    }
  } catch (err) {
    console.warn('Auth session check failed:', err);
  }

  // Load app now that auth state is set
  loadApp();

  // Set up click interceptor for sign in/out buttons
  setupClickInterceptor(supabase);

  // Inject modal styles
  injectStyles();
}

// ---- Build User Object ----
async function buildUserObject(supabase, supaUser) {
  let profile = null;
  try {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', supaUser.id)
      .single();
    profile = data;
  } catch (e) { /* profile table might not exist yet */ }

  const joinDate = new Date(supaUser.created_at).toLocaleDateString('en-US', {
    month: 'short', year: 'numeric'
  });

  return {
    id: supaUser.id,
    name: profile?.name || supaUser.user_metadata?.name || supaUser.email.split('@')[0],
    email: supaUser.email,
    avatar: profile?.avatar || '😊',
    bio: profile?.bio || '',
    joinDate: joinDate,
    totalSales: profile?.total_sales || 0,
    totalEarnings: profile?.total_earnings || 0,
    paymentMethod: null,
    listings: []
  };
}

// ---- Click Interceptor ----
function setupClickInterceptor(supabase) {
  document.addEventListener('click', function(e) {
    const btn = e.target.closest('button');
    if (!btn) return;
    const text = btn.textContent.trim();

    // Intercept sign in/up buttons
    if (text === 'Sign in' || text === 'Sign up' || text === 'Create account' || text === 'Sign in to Checkout') {
      e.stopImmediatePropagation();
      e.preventDefault();
      showAuthModal(supabase, text.includes('up') || text.includes('Create') ? 'register' : 'login');
      return;
    }

    // Intercept sign out
    if (text === 'Sign out' || text === 'Sign Out' || text === 'Log out' || text === 'Log Out') {
      e.stopImmediatePropagation();
      e.preventDefault();
      supabase.auth.signOut().then(() => window.location.reload());
      return;
    }
  }, true);

  // Also intercept links/spans that say "Sign in to review" etc.
  document.addEventListener('click', function(e) {
    const el = e.target.closest('p, span, a');
    if (!el) return;
    const text = el.textContent.trim();
    if (text === 'Sign in to review' || text === 'Sign in to access your store' || text === 'Sign in to view your purchases') {
      e.stopImmediatePropagation();
      e.preventDefault();
      showAuthModal(supabase, 'login');
    }
  }, true);
}

// ---- Auth Modal ----
function showAuthModal(supabase, mode = 'login') {
  const existing = document.getElementById('supabase-auth-modal');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'supabase-auth-modal';
  overlay.innerHTML = `
    <div class="sa-overlay">
      <div class="sa-modal">
        <button class="sa-close" id="sa-close-btn">✕</button>
        <div class="sa-header">
          <h2 id="sa-title">${mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
          <p id="sa-subtitle">${mode === 'login' ? 'Sign in to your account' : 'Join the Skills Marketplace'}</p>
        </div>
        <div id="sa-error" class="sa-error" style="display:none"></div>
        <div id="sa-success" class="sa-success" style="display:none"></div>
        <form id="sa-form">
          <div id="sa-name-field" class="sa-field" style="display:${mode === 'register' ? 'block' : 'none'}">
            <label>Name</label>
            <input type="text" id="sa-name" placeholder="Your name" autocomplete="name" />
          </div>
          <div class="sa-field">
            <label>Email</label>
            <input type="email" id="sa-email" placeholder="you@example.com" required autocomplete="email" />
          </div>
          <div class="sa-field">
            <label>Password</label>
            <input type="password" id="sa-password" placeholder="••••••••" required minlength="6" autocomplete="${mode === 'register' ? 'new-password' : 'current-password'}" />
          </div>
          <button type="submit" id="sa-submit" class="sa-submit">
            <span id="sa-submit-text">${mode === 'login' ? 'Sign in' : 'Create account'}</span>
            <span id="sa-submit-loading" style="display:none">
              <svg width="20" height="20" viewBox="0 0 24 24" class="sa-spinner"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="31.4 31.4" stroke-linecap="round"/></svg>
            </span>
          </button>
        </form>
        <div class="sa-switch">
          ${mode === 'login'
            ? "Don't have an account? <a href='#' id='sa-toggle'>Sign up</a>"
            : "Already have an account? <a href='#' id='sa-toggle'>Sign in</a>"
          }
        </div>
        ${mode === 'login' ? '<div class="sa-forgot"><a href="#" id="sa-forgot-link">Forgot password?</a></div>' : ''}
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  setTimeout(() => document.getElementById('sa-email')?.focus(), 100);

  // Close modal
  overlay.querySelector('.sa-overlay').addEventListener('click', function(e) {
    if (e.target === this) overlay.remove();
  });
  document.getElementById('sa-close-btn').addEventListener('click', () => overlay.remove());

  // Toggle login/register
  document.getElementById('sa-toggle').addEventListener('click', function(e) {
    e.preventDefault();
    overlay.remove();
    showAuthModal(supabase, mode === 'login' ? 'register' : 'login');
  });

  // Forgot password
  const forgotLink = document.getElementById('sa-forgot-link');
  if (forgotLink) {
    forgotLink.addEventListener('click', async function(e) {
      e.preventDefault();
      const email = document.getElementById('sa-email').value;
      if (!email) { showModalError('Please enter your email first'); return; }
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + window.location.pathname
      });
      if (error) showModalError(error.message);
      else showModalSuccess('Password reset email sent! Check your inbox.');
    });
  }

  // Form submit
  document.getElementById('sa-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('sa-email').value.trim();
    const password = document.getElementById('sa-password').value;
    const name = document.getElementById('sa-name')?.value.trim() || '';

    if (!email || !password) { showModalError('Please fill in all fields'); return; }
    if (password.length < 6) { showModalError('Password must be at least 6 characters'); return; }

    setModalLoading(true);
    hideModalError();

    if (mode === 'register') {
      const { data, error } = await supabase.auth.signUp({
        email, password,
        options: { data: { name: name || email.split('@')[0] } }
      });
      if (error) { showModalError(error.message); setModalLoading(false); return; }
      if (data.user && !data.session) {
        showModalSuccess('Check your email for a confirmation link, then sign in!');
        setModalLoading(false);
        return;
      }
      if (data.session) window.location.reload();
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        const msg = error.message.includes('Invalid login') ? 'Incorrect email or password.'
                  : error.message.includes('not confirmed') ? 'Please confirm your email first. Check your inbox.'
                  : error.message;
        showModalError(msg);
        setModalLoading(false);
        return;
      }
      if (data.session) window.location.reload();
    }
  });
}

// ---- Modal UI Helpers ----
function showModalError(msg) {
  const el = document.getElementById('sa-error');
  if (el) { el.textContent = msg; el.style.display = 'block'; }
}
function hideModalError() {
  const el = document.getElementById('sa-error');
  if (el) el.style.display = 'none';
}
function showModalSuccess(msg) {
  const el = document.getElementById('sa-success');
  if (el) { el.textContent = msg; el.style.display = 'block'; }
  const form = document.getElementById('sa-form');
  if (form) form.style.display = 'none';
}
function setModalLoading(loading) {
  const text = document.getElementById('sa-submit-text');
  const spinner = document.getElementById('sa-submit-loading');
  const btn = document.getElementById('sa-submit');
  if (text) text.style.display = loading ? 'none' : 'inline';
  if (spinner) spinner.style.display = loading ? 'inline-flex' : 'none';
  if (btn) btn.disabled = loading;
}

// ---- Inject Styles ----
function injectStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .sa-overlay {
      position: fixed; inset: 0;
      background: rgba(30, 28, 22, 0.55);
      backdrop-filter: blur(4px);
      display: flex; align-items: center; justify-content: center;
      z-index: 99999;
      animation: sa-fadeIn 0.2s ease;
    }
    @keyframes sa-fadeIn { from { opacity: 0 } to { opacity: 1 } }
    @keyframes sa-slideUp { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
    @keyframes sa-spin { to { transform: rotate(360deg) } }
    .sa-modal {
      background: #fffdf9; border-radius: 16px; padding: 32px;
      width: 100%; max-width: 400px; margin: 16px;
      position: relative;
      box-shadow: 0 24px 48px rgba(30, 28, 22, 0.18);
      animation: sa-slideUp 0.25s ease;
      border: 1px solid #e8e4db;
    }
    .sa-close {
      position: absolute; top: 16px; right: 16px;
      background: none; border: none; font-size: 18px; color: #9a9589;
      cursor: pointer; width: 32px; height: 32px; border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
    }
    .sa-close:hover { background: #f0ece4; color: #3d3929; }
    .sa-header { margin-bottom: 24px; }
    .sa-header h2 { font-size: 22px; font-weight: 700; color: #3d3929; margin: 0 0 4px; }
    .sa-header p { font-size: 14px; color: #7a7567; margin: 0; }
    .sa-field { margin-bottom: 16px; }
    .sa-field label { display: block; font-size: 12px; font-weight: 600; color: #7a7567; margin-bottom: 5px; }
    .sa-field input {
      width: 100%; padding: 10px 12px; border: 1px solid #d8d5cc;
      border-radius: 10px; font-size: 14px; color: #3d3929;
      background: #fff; outline: none; box-sizing: border-box; font-family: inherit;
    }
    .sa-field input:focus { border-color: #C15F3C; box-shadow: 0 0 0 3px rgba(193,95,60,0.1); }
    .sa-field input::placeholder { color: #bbb5a8; }
    .sa-submit {
      width: 100%; padding: 11px; background: #C15F3C; color: white;
      border: none; border-radius: 10px; font-size: 14px; font-weight: 600;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      margin-top: 4px; font-family: inherit;
    }
    .sa-submit:hover { opacity: 0.9; }
    .sa-submit:disabled { opacity: 0.5; cursor: not-allowed; }
    .sa-spinner { animation: sa-spin 0.8s linear infinite; }
    .sa-switch { text-align: center; margin-top: 18px; font-size: 13px; color: #7a7567; }
    .sa-switch a { color: #C15F3C; font-weight: 600; text-decoration: none; }
    .sa-switch a:hover { text-decoration: underline; }
    .sa-forgot { text-align: center; margin-top: 10px; font-size: 12px; }
    .sa-forgot a { color: #9a9589; text-decoration: none; }
    .sa-forgot a:hover { color: #C15F3C; text-decoration: underline; }
    .sa-error {
      background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c;
      padding: 10px 14px; border-radius: 10px; font-size: 13px; margin-bottom: 16px;
    }
    .sa-success {
      background: #f0fdf4; border: 1px solid #bbf7d0; color: #15803d;
      padding: 10px 14px; border-radius: 10px; font-size: 13px; margin-bottom: 16px;
    }
  `;
  document.head.appendChild(style);
}
