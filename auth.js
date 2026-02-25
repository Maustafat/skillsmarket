// ============================================
// Supabase Auth for Skills Marketplace
// ============================================

const SUPABASE_URL = 'https://amjhxaautglxhwbuqlmg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtamh4YWF1dGdseGh3YnVxbG1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMTIxNjMsImV4cCI6MjA4NzU4ODE2M30.kh1q1aYnoTw6v_Q5LRatr2K0DmD6FRXyWfWGwnPkcys';

function loadApp() {
  const script = document.createElement('script');
  script.type = 'module';
  script.src = 'app.js';
  document.body.appendChild(script);
}

if (typeof window.supabase === 'undefined' || !window.supabase || !window.supabase.createClient) {
  console.warn('Supabase not loaded — running in demo mode');
  loadApp();
} else {
  initAuth();
}

async function initAuth() {
  const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  window.__supabase = sb;

  // ---- Check existing session on page load ----
  try {
    const { data: { session } } = await sb.auth.getSession();
    if (session && window.__SKILLS_DATA) {
      const user = buildUserObject(session.user);
      window.__SKILLS_DATA.currentUser = user;
      if (!window.__SKILLS_DATA.users.find(u => u.email === user.email)) {
        window.__SKILLS_DATA.users.push(user);
      }
    }
  } catch (err) {
    console.warn('Auth session check failed:', err);
  }

  // ---- Define the login handler that app.js calls ----
  // d = {email, password, name} from React form state
  // a = React dispatch function
  // s = dialog setOpen function
  window.__handleLogin = async function(d, a, s) {
    const email = (d.email || '').trim();
    const password = d.password || '';
    const name = (d.name || '').trim();

    if (!email) {
      showToast('Please enter your email address.', 'error');
      return;
    }
    if (!password || password.length < 6) {
      showToast('Password must be at least 6 characters.', 'error');
      return;
    }

    // Try sign in first
    const { data: signInData, error: signInError } = await sb.auth.signInWithPassword({
      email, password
    });

    if (signInData.session) {
      // Successful login — reload to pick up session
      window.location.reload();
      return;
    }

    // If "Invalid login credentials", the user might not exist yet — try sign up
    if (signInError && signInError.message.includes('Invalid login')) {
      // Check if the user wants to register (name field filled = register mode)
      if (name) {
        const { data: signUpData, error: signUpError } = await sb.auth.signUp({
          email, password,
          options: { data: { name: name } }
        });

        if (signUpError) {
          showToast(signUpError.message, 'error');
          return;
        }

        if (signUpData.user && !signUpData.session) {
          showToast('Check your email for a confirmation link!', 'success');
          return;
        }

        if (signUpData.session) {
          window.location.reload();
          return;
        }
      } else {
        showToast('Incorrect email or password.', 'error');
        return;
      }
    }

    // Other errors
    if (signInError) {
      if (signInError.message.includes('not confirmed')) {
        showToast('Please confirm your email first. Check your inbox.', 'error');
      } else {
        showToast(signInError.message, 'error');
      }
      return;
    }
  };

  // ---- Load the app ----
  loadApp();
  injectStyles();
}

// ---- Build user object matching the app's expected shape ----
function buildUserObject(supaUser) {
  const joinDate = new Date(supaUser.created_at).toLocaleDateString('en-US', {
    month: 'short', year: 'numeric'
  });
  return {
    id: supaUser.id,
    name: supaUser.user_metadata?.name || supaUser.email.split('@')[0],
    email: supaUser.email,
    avatar: '😊',
    bio: '',
    joinDate: joinDate,
    totalSales: 0,
    totalEarnings: 0,
    paymentMethod: null,
    listings: []
  };
}

// ---- Toast notification ----
function showToast(message, type) {
  // Remove existing toast
  const existing = document.getElementById('sa-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'sa-toast';
  toast.className = 'sa-toast sa-toast-' + type;
  toast.textContent = message;
  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => toast.classList.add('sa-toast-show'));

  // Auto remove after 4s
  setTimeout(() => {
    toast.classList.remove('sa-toast-show');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ---- Styles ----
function injectStyles() {
  const s = document.createElement('style');
  s.textContent = `
    .sa-toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      padding: 12px 24px;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 500;
      z-index: 99999;
      opacity: 0;
      transition: all 0.3s ease;
      max-width: 400px;
      text-align: center;
      font-family: inherit;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    }
    .sa-toast-show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    .sa-toast-error {
      background: #fef2f2;
      border: 1px solid #fecaca;
      color: #b91c1c;
    }
    .sa-toast-success {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      color: #15803d;
    }
  `;
  document.head.appendChild(s);
}
