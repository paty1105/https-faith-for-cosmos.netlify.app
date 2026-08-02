// Shared auth helpers for Faith for the Cosmos course pages

// Sends a magic link to the given email
async function sendMagicLink(email) {
  const { error } = await supabaseClient.auth.signInWithOtp({
    email: email,
    options: {
      emailRedirectTo: `${SITE_URL}/dashboard.html`,
    },
  });
  return error;
}

// Returns the current logged-in user, or null
async function getCurrentUser() {
  const { data: { user } } = await supabaseClient.auth.getUser();
  return user;
}

// Redirects to login.html if nobody is logged in.
// Call this at the top of any page that requires a session.
async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    window.location.href = "login.html";
    return null;
  }
  return user;
}

async function signOut() {
  await supabaseClient.auth.signOut();
  window.location.href = "login.html";
}

// Marks a module complete for the current user (safe to call more than once)
async function markModuleComplete(moduleNumber) {
  const user = await getCurrentUser();
  if (!user) return { error: "not logged in" };

  const { error } = await supabaseClient
    .from("progress")
    .upsert(
      { user_id: user.id, module_number: moduleNumber },
      { onConflict: "user_id,module_number" }
    );
  return { error };
}

// Returns an array of module numbers the current user has completed, e.g. [1, 2]
async function getCompletedModules() {
  const user = await getCurrentUser();
  if (!user) return [];

  const { data, error } = await supabaseClient
    .from("progress")
    .select("module_number")
    .eq("user_id", user.id);

  if (error || !data) return [];
  return data.map((row) => row.module_number);
}
