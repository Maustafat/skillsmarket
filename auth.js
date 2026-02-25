// ============================================
// Supabase Auth for Skills Marketplace
// ============================================

const SUPABASE_URL = 'https://amjhxaautglxhwbuqlmg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtamh4YWF1dGdseGh3YnVxbG1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMTIxNjMsImV4cCI6MjA4NzU4ODE2M30.kh1q1aYnoTw6v_Q5LRatr2K0DmD6FRXyWfWGwnPkcys';

function loadApp() {
  var s = document.createElement('script');
  s.type = 'module';
  s.src = 'app.js';
  document.body.appendChild(s);
}

if (typeof window.supabase === 'undefined' || !window.supabase || !window.supabase.createClient) {
  console.warn('[Auth] Supabase CDN not loaded — demo mode');
  loadApp();
} else {
  initAuth();
}

async function initAuth() {
  var sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  window.__supabase = sb;
  console.log('[Auth] Supabase connected');

  // Check existing session
  try {
    var result = await sb.auth.getSession();
    var session = result.data.session;
    if (session && window.__SKILLS_DATA) {
      console.log('[Auth] Session found:', session.user.email);
      var user = buildUser(session.user);
      window.__SKILLS_DATA.currentUser = user;
      var users = window.__SKILLS_DATA.users;
      if (!users.find(function(u) { return u.email === user.email; })) {
        users.push(user);
      }
    }
  } catch (err) {
    console.warn('[Auth] Session check error:', err);
  }

  // ---- The login handler called by app.js ----
  // app.js calls: window.__authLogin(email, password, name, dispatch, setDialogOpen)
  window.__authLogin = async function(email, password, name, dispatch, setOpen) {
    email = (email || '').trim();
    password = password || '';
    name = (name || '').trim();

    console.log('[Auth] Login attempt:', email);

    if (!email) {
      showToast('Please enter your email.', 'error');
      return;
    }
    if (!password || password.length < 6) {
      showToast('Password must be at least 6 characters.', 'error');
      return;
    }

    // Try sign in
    var signIn = await sb.auth.signInWithPassword({ email: email, password: password });

    if (signIn.data.session) {
      console.log('[Auth] Sign in success');
      setOpen(false);
      showToast('Signed in!', 'success');
      setTimeout(function() { window.location.reload(); }, 500);
      return;
    }

    if (signIn.error) {
      var msg = signIn.error.message;
      console.log('[Auth] Sign in error:', msg);

      // Wrong password or user doesn't exist
      if (msg.includes('Invalid login')) {
        // If name is provided, they're trying to register
        if (name) {
          console.log('[Auth] Attempting sign up...');
          var signUp = await sb.auth.signUp({
            email: email,
            password: password,
            options: { data: { name: name } }
          });

          if (signUp.error) {
            showToast(signUp.error.message, 'error');
            return;
          }
          if (signUp.data.user && !signUp.data.session) {
            showToast('Check your email to confirm your account!', 'success');
            return;
          }
          if (signUp.data.session) {
            setOpen(false);
            showToast('Account created!', 'success');
            setTimeout(function() { window.location.reload(); }, 500);
            return;
          }
        } else {
          showToast('Incorrect email or password.', 'error');
          return;
        }
      } else if (msg.includes('not confirmed')) {
        showToast('Please confirm your email first. Check your inbox.', 'error');
        return;
      } else {
        showToast(msg, 'error');
        return;
      }
    }
  };

  // Load app
  loadApp();
  injectStyles();
  console.log('[Auth] Ready');
}

function buildUser(su) {
  return {
    id: su.id,
    name: (su.user_metadata && su.user_metadata.name) || su.email.split('@')[0],
    email: su.email,
    avatar: '\u{1F60A}',
    bio: '',
    joinDate: new Date(su.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    totalSales: 0,
    totalEarnings: 0,
    paymentMethod: null,
    listings: []
  };
}

function showToast(message, type) {
  var old = document.getElementById('sa-toast');
  if (old) old.remove();
  var t = document.createElement('div');
  t.id = 'sa-toast';
  t.className = 'sa-toast sa-toast-' + type;
  t.textContent = message;
  document.body.appendChild(t);
  requestAnimationFrame(function() { t.classList.add('sa-toast-show'); });
  setTimeout(function() {
    t.classList.remove('sa-toast-show');
    setTimeout(function() { t.remove(); }, 300);
  }, 4000);
}

function injectStyles() {
  var s = document.createElement('style');
  s.textContent = '.sa-toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(20px);padding:12px 24px;border-radius:12px;font-size:14px;font-weight:500;z-index:99999;opacity:0;transition:all .3s ease;max-width:400px;text-align:center;font-family:inherit;box-shadow:0 8px 24px rgba(0,0,0,.15)}.sa-toast-show{opacity:1;transform:translateX(-50%) translateY(0)}.sa-toast-error{background:#fef2f2;border:1px solid #fecaca;color:#b91c1c}.sa-toast-success{background:#f0fdf4;border:1px solid #bbf7d0;color:#15803d}';
  document.head.appendChild(s);
}
