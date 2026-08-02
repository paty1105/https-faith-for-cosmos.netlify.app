// Faith for the Cosmos: Supabase client
// Fill in your own Project URL and anon public key from
// Supabase > Project Settings > API, then this file powers every page.

const SUPABASE_URL = "https://yruejuzpyaxswhakxugd.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_poSpqJ-NF35ORfhEhNl5Rw_5XbGY-Tr";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Redirect target after a pastor clicks the magic link in their email
const SITE_URL = window.location.origin;
