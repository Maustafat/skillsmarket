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
if (typeof window.supabase === 'undefined' || !window.supabase || !window.supabase.createClient) {
  console.warn('Supabase not loaded — running in demo mode');
  loadApp();
} else {
  initAuth();
}

async function initAuth() {
  const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  window.__supabase = sb;

  // Check for existing session
  try {
    const { data: { session } } = await sb.auth.getSession();
    if (session && window.__SKILLS_DATA) {
      const user = await buildUserObject(sb, session.user);
      window.__SKILLS_DATA.currentUser = user;
      if (!window.__SKILLS_DATA.users.find(u => u.email === user.email)) {
        window.__SKILLS_DATA.users.push(user);
      }
    }
  } catch (err) {
    console.warn('Auth session check failed:', err);
  }

  // Load the React app
  loadApp();

  // Inject styles immediately
  injectStyles();

  // Wait a tick for React to mount, then set up interceptors
  setTimeout(() => {
    setupInterceptors(sb);
  }, 500);
}

// ---- Build User Object ----
async function buildUserObject(sb, supaUser) {
  let profile = null;
  try {
    const { data } = await sb.from('profiles').select('*').eq('id', supaUser.id).single();
    profile = data;
  } catch (e) { /* ok */ }

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

// ---- Interceptors ----
// Instead of trying to prevent React events (unreliable),
// we watch the DOM for the OLD login dialog and replace it.
function setupInterceptors(sb) {

  // Strategy: Use a MutationObserver to detect when the old React auth dialog
  // appears, then immediately hide it and show our Supabase modal instead.
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType !== 1) continue;

        // Look for the old dialog overlay - it has role="dialog" or specific text
        const dialog = node.querySelector ? node.querySelector('[role="dialog"], [data-state="open"]') : null;
        const selfDialog = node.getAttribute ? (node.getAttribute('role') === 'dialog' || node.getAttribute('data-state') === 'open') : false;

        if (dialog || selfDialog) {
          const target = dialog || node;
          const text = target.textContent || '';

          // Check if this is the auth dialog
          if (text.includes('Sign in') && text.includes('Email') ||
              text.includes('Create account') && text.includes('Email')) {
            // Hide the React dialog
            const overlay = target.closest('[data-state="open"]') || target.parentElement;
            if (overlay) {
              overlay.style.display = 'none';
              // Also try to find and click the close button
              const closeBtn = overlay.querySelector('button[aria-label="Close"], button:first-child');
              if (closeBtn) setTimeout(() => closeBtn.click(), 50);
            }

            // Show Supabase modal instead
            const mode = text.includes('Create account') ? 'register' : 'login';
            showAuthModal(sb, mode);
            return;
          }
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Also intercept sign out
  document.addEventListener('click', function(e) {
    const btn = e.target.closest('button');
    if (!btn) return;
    const text = btn.textContent.trim();
    if (text === 'Sign out' || text === 'Sign Out' || text === 'Log out' || text === 'Log Out') {
      e.preventDefault();
      e.stopPropagation();
      sb.auth.signOut().then(() => window.location.reload());
    }
  }, true);
}

// ---- Auth Modal ----
function showAuthModal(sb, mode) {
  const existing = document.getElementById('supabase-auth-modal');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'supabase-auth-modal';
  overlay.innerHTML = `
    <div class="sa-overlay">
      <div class="sa-modal">
        <button class="sa-close" id="sa-close-btn">&times;</button>
        <div class="sa-header">
          <h2>${mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
          <p>${mode === 'login' ? 'Sign in to your account' : 'Join the Skills Marketplace'}</p>
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
        <div class="sa-divider"><span>or</span></div>
        <button id="sa-google-btn" class="sa-google-btn">
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Continue with Google
        </button>
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

  // Close
  overlay.querySelector('.sa-overlay').addEventListener('click', function(e) {
    if (e.target === this) overlay.remove();
  });
  document.getElementById('sa-close-btn').addEventListener('click', () => overlay.remove());

  // Toggle login/register
  document.getElementById('sa-toggle').addEventListener('click', function(e) {
    e.preventDefault();
    overlay.remove();
    showAuthModal(sb, mode === 'login' ? 'register' : 'login');
  });

  // Forgot password
  const forgotLink = document.getElementById('sa-forgot-link');
  if (forgotLink) {
    forgotLink.addEventListener('click', async function(e) {
      e.preventDefault();
      const email = document.getElementById('sa-email').value;
      if (!email) { showErr('Please enter your email first'); return; }
      const { error } = await sb.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + window.location.pathname
      });
      if (error) showErr(error.message);
      else showOk('Password reset email sent! Check your inbox.');
    });
  }

  // Google OAuth
  document.getElementById('sa-google-btn').addEventListener('click', async function() {
    const { error } = await sb.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + window.location.pathname }
    });
    if (error) showErr(error.message);
  });

  // Form submit
  document.getElementById('sa-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('sa-email').value.trim();
    const password = document.getElementById('sa-password').value;
    const name = document.getElementById('sa-name')?.value.trim() || '';

    if (!email || !password) { showErr('Please fill in all fields'); return; }
    if (password.length < 6) { showErr('Password must be at least 6 characters'); return; }

    setLoading(true);
    hideErr();

    try {
      if (mode === 'register') {
        const { data, error } = await sb.auth.signUp({
          email, password,
          options: { data: { name: name || email.split('@')[0] } }
        });
        if (error) { showErr(error.message); setLoading(false); return; }
        if (data.user && !data.session) {
          showOk('Check your email for a confirmation link, then sign in!');
          setLoading(false);
          return;
        }
        if (data.session) window.location.reload();
      } else {
        const { data, error } = await sb.auth.signInWithPassword({ email, password });
        if (error) {
          const msg = error.message.includes('Invalid login') ? 'Incorrect email or password.'
                    : error.message.includes('not confirmed') ? 'Please confirm your email first.'
                    : error.message;
          showErr(msg);
          setLoading(false);
          return;
        }
        if (data.session) window.location.reload();
      }
    } catch (err) {
      showErr('Something went wrong. Please try again.');
      setLoading(false);
    }
  });
}

// ---- Modal helpers ----
function showErr(msg) {
  const el = document.getElementById('sa-error');
  if (el) { el.textContent = msg; el.style.display = 'block'; }
}
function hideErr() {
  const el = document.getElementById('sa-error');
  if (el) el.style.display = 'none';
}
function showOk(msg) {
  const el = document.getElementById('sa-success');
  if (el) { el.textContent = msg; el.style.display = 'block'; }
  const form = document.getElementById('sa-form');
  if (form) form.style.display = 'none';
  const google = document.getElementById('sa-google-btn');
  if (google) google.style.display = 'none';
}
function setLoading(on) {
  const t = document.getElementById('sa-submit-text');
  const s = document.getElementById('sa-submit-loading');
  const b = document.getElementById('sa-submit');
  if (t) t.style.display = on ? 'none' : 'inline';
  if (s) s.style.display = on ? 'inline-flex' : 'none';
  if (b) b.disabled = on;
}

// ---- Styles ----
function injectStyles() {
  const s = document.createElement('style');
  s.textContent = `
    .sa-overlay {
      position: fixed; inset: 0;
      background: rgba(30,28,22,0.55);
      backdrop-filter: blur(4px);
      display: flex; align-items: center; justify-content: center;
      z-index: 99999;
      animation: sa-fadeIn 0.2s ease;
    }
    @keyframes sa-fadeIn { from{opacity:0} to{opacity:1} }
    @keyframes sa-slideUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
    @keyframes sa-spin { to{transform:rotate(360deg)} }
    .sa-modal {
      background:#fffdf9; border-radius:16px; padding:32px;
      width:100%; max-width:400px; margin:16px;
      position:relative;
      box-shadow:0 24px 48px rgba(30,28,22,0.18);
      animation:sa-slideUp 0.25s ease;
      border:1px solid #e8e4db;
    }
    .sa-close {
      position:absolute; top:12px; right:12px;
      background:none; border:none; font-size:22px; color:#9a9589;
      cursor:pointer; width:32px; height:32px; border-radius:8px;
      display:flex; align-items:center; justify-content:center;
      line-height:1;
    }
    .sa-close:hover { background:#f0ece4; color:#3d3929; }
    .sa-header { margin-bottom:24px; }
    .sa-header h2 { font-size:22px; font-weight:700; color:#3d3929; margin:0 0 4px; }
    .sa-header p { font-size:14px; color:#7a7567; margin:0; }
    .sa-field { margin-bottom:16px; }
    .sa-field label { display:block; font-size:12px; font-weight:600; color:#7a7567; margin-bottom:5px; }
    .sa-field input {
      width:100%; padding:10px 12px; border:1px solid #d8d5cc;
      border-radius:10px; font-size:14px; color:#3d3929;
      background:#fff; outline:none; box-sizing:border-box; font-family:inherit;
    }
    .sa-field input:focus { border-color:#C15F3C; box-shadow:0 0 0 3px rgba(193,95,60,0.1); }
    .sa-field input::placeholder { color:#bbb5a8; }
    .sa-submit {
      width:100%; padding:11px; background:#C15F3C; color:white;
      border:none; border-radius:10px; font-size:14px; font-weight:600;
      cursor:pointer; display:flex; align-items:center; justify-content:center;
      margin-top:4px; font-family:inherit;
    }
    .sa-submit:hover { opacity:0.9; }
    .sa-submit:disabled { opacity:0.5; cursor:not-allowed; }
    .sa-spinner { animation:sa-spin 0.8s linear infinite; }
    .sa-divider {
      display:flex; align-items:center; gap:12px;
      margin:18px 0; color:#bbb5a8; font-size:12px;
    }
    .sa-divider::before, .sa-divider::after {
      content:''; flex:1; height:1px; background:#e8e4db;
    }
    .sa-google-btn {
      width:100%; padding:10px; background:white; color:#3d3929;
      border:1px solid #d8d5cc; border-radius:10px; font-size:14px;
      cursor:pointer; display:flex; align-items:center; justify-content:center;
      gap:10px; font-family:inherit; font-weight:500;
    }
    .sa-google-btn:hover { background:#faf8f5; border-color:#C15F3C; }
    .sa-switch { text-align:center; margin-top:18px; font-size:13px; color:#7a7567; }
    .sa-switch a { color:#C15F3C; font-weight:600; text-decoration:none; }
    .sa-switch a:hover { text-decoration:underline; }
    .sa-forgot { text-align:center; margin-top:10px; font-size:12px; }
    .sa-forgot a { color:#9a9589; text-decoration:none; }
    .sa-forgot a:hover { color:#C15F3C; text-decoration:underline; }
    .sa-error {
      background:#fef2f2; border:1px solid #fecaca; color:#b91c1c;
      padding:10px 14px; border-radius:10px; font-size:13px; margin-bottom:16px;
    }
    .sa-success {
      background:#f0fdf4; border:1px solid #bbf7d0; color:#15803d;
      padding:10px 14px; border-radius:10px; font-size:13px; margin-bottom:16px;
    }
  `;
  document.head.appendChild(s);
}
