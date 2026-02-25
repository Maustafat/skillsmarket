// ============================================
// Supabase Auth for Skills Marketplace
// ============================================

const SUPABASE_URL = 'https://amjhxaautglxhwbuqlmg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtamh4YWF1dGdseGh3YnVxbG1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMTIxNjMsImV4cCI6MjA4NzU4ODE2M30.kh1q1aYnoTw6v_Q5LRatr2K0DmD6FRXyWfWGwnPkcys';

function loadApp() {
  const s = document.createElement('script');
  s.type = 'module';
  s.src = 'app.js';
  document.body.appendChild(s);
}

if (typeof window.supabase === 'undefined' || !window.supabase || !window.supabase.createClient) {
  console.warn('[Auth] Supabase not loaded — demo mode');
  loadApp();
} else {
  initAuth();
}

async function initAuth() {
  const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  window.__supabase = sb;
  console.log('[Auth] Supabase connected');

  // Check existing session
  try {
    const { data: { session } } = await sb.auth.getSession();
    if (session && window.__SKILLS_DATA) {
      console.log('[Auth] Active session found for', session.user.email);
      const user = buildUser(session.user);
      window.__SKILLS_DATA.currentUser = user;
      if (!window.__SKILLS_DATA.users.find(u => u.email === user.email)) {
        window.__SKILLS_DATA.users.push(user);
      }
    }
  } catch (err) {
    console.warn('[Auth] Session check failed:', err);
  }

  // Load the React app (completely unmodified)
  loadApp();
  injectStyles();

  // --- Intercept the dialog submit button ---
  // Strategy: Listen for clicks in CAPTURING phase.
  // The submit button inside the dialog has class "w-full" and white text.
  // Navbar buttons do NOT have "w-full".
  document.addEventListener('click', async function(e) {
    const btn = e.target.closest('button');
    if (!btn) return;

    const text = btn.textContent.trim();
    const isWide = btn.classList.contains('w-full');
    const isInDialog = !!btn.closest('[role="dialog"]');

    // --- Submit button inside login/signup dialog ---
    if ((isWide || isInDialog) && (text === 'Sign in' || text === 'Create account')) {
      e.stopImmediatePropagation();
      e.preventDefault();

      // Read values from the React form inputs
      const dialog = btn.closest('[role="dialog"]') || btn.parentElement.parentElement.parentElement;
      const inputs = dialog ? dialog.querySelectorAll('input') : document.querySelectorAll('[role="dialog"] input, .fixed input');
      
      let email = '', password = '', name = '';
      inputs.forEach(inp => {
        if (inp.type === 'email') email = inp.value.trim();
        else if (inp.type === 'password') password = inp.value;
        else if (inp.type === 'text' && inp.placeholder && inp.placeholder.toLowerCase().includes('name')) name = inp.value.trim();
        // Also check by placeholder
        if (inp.placeholder === 'you@example.com') email = inp.value.trim();
        if (inp.placeholder === '••••••••') password = inp.value;
      });

      console.log('[Auth] Intercepted submit:', text, '| email:', email);

      if (!email) { showToast('Please enter your email.', 'error'); return; }
      if (!password || password.length < 6) { showToast('Password must be at least 6 characters.', 'error'); return; }

      // Disable button while loading
      btn.disabled = true;
      const origText = btn.textContent;
      btn.textContent = 'Please wait...';

      if (text === 'Create account') {
        // --- SIGN UP ---
        const { data, error } = await sb.auth.signUp({
          email, password,
          options: { data: { name: name || email.split('@')[0] } }
        });
        if (error) {
          showToast(error.message, 'error');
          btn.disabled = false; btn.textContent = origText;
          return;
        }
        if (data.user && !data.session) {
          showToast('Check your email to confirm your account!', 'success');
          btn.disabled = false; btn.textContent = origText;
          return;
        }
        if (data.session) {
          showToast('Account created! Logging in...', 'success');
          setTimeout(() => window.location.reload(), 500);
          return;
        }
      } else {
        // --- SIGN IN ---
        const { data, error } = await sb.auth.signInWithPassword({ email, password });
        if (error) {
          let msg = 'Incorrect email or password.';
          if (error.message.includes('not confirmed')) msg = 'Please confirm your email first.';
          else if (!error.message.includes('Invalid login')) msg = error.message;
          showToast(msg, 'error');
          btn.disabled = false; btn.textContent = origText;
          return;
        }
        if (data.session) {
          showToast('Signed in!', 'success');
          setTimeout(() => window.location.reload(), 500);
          return;
        }
      }

      btn.disabled = false; btn.textContent = origText;
      return;
    }

    // --- Sign out button ---
    if (text === 'Sign out') {
      e.stopImmediatePropagation();
      e.preventDefault();
      console.log('[Auth] Signing out');
      await sb.auth.signOut();
      window.location.reload();
      return;
    }

    // --- "Sign in to Checkout" button ---
    if (text === 'Sign in to Checkout') {
      // Let it pass — the dialog will open, then we intercept the submit
      return;
    }

  }, true); // CAPTURING PHASE — runs before React's handlers
}

function buildUser(su) {
  return {
    id: su.id,
    name: su.user_metadata?.name || su.email.split('@')[0],
    email: su.email,
    avatar: '😊', bio: '',
    joinDate: new Date(su.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    totalSales: 0, totalEarnings: 0, paymentMethod: null, listings: []
  };
}

function showToast(message, type) {
  const old = document.getElementById('sa-toast');
  if (old) old.remove();
  const t = document.createElement('div');
  t.id = 'sa-toast';
  t.className = 'sa-toast sa-toast-' + type;
  t.textContent = message;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('sa-toast-show'));
  setTimeout(() => { t.classList.remove('sa-toast-show'); setTimeout(() => t.remove(), 300); }, 4000);
}

function injectStyles() {
  const s = document.createElement('style');
  s.textContent = `
    .sa-toast {
      position:fixed; bottom:24px; left:50%; transform:translateX(-50%) translateY(20px);
      padding:12px 24px; border-radius:12px; font-size:14px; font-weight:500;
      z-index:99999; opacity:0; transition:all 0.3s ease;
      max-width:400px; text-align:center; font-family:inherit;
      box-shadow:0 8px 24px rgba(0,0,0,0.15);
    }
    .sa-toast-show { opacity:1; transform:translateX(-50%) translateY(0); }
    .sa-toast-error { background:#fef2f2; border:1px solid #fecaca; color:#b91c1c; }
    .sa-toast-success { background:#f0fdf4; border:1px solid #bbf7d0; color:#15803d; }
  `;
  document.head.appendChild(s);
}
