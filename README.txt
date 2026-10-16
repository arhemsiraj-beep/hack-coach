HACK COACH - install guide
==========================

What you have
-------------
hack-coach.zip   Upload this to WordPress.
hack-coach/      The same plugin as plain files.

Before you start
----------------
1. Anthropic API key (required): console.anthropic.com > API keys.
   Set a monthly spending limit there.
2. Tavily API key (recommended): tavily.com. Free tier is enough. Needed for
   judge research. Without it, judges can only be researched from links you paste.

Install (about 5 minutes)
-------------------------
1. WordPress admin > Plugins > Add New Plugin > Upload Plugin.
2. Choose hack-coach.zip > Install Now > Activate.
   (If there is no Upload Plugin button, tell Claude. Use the Vercel route instead.)
3. Settings > Hack Coach. Paste both keys, set a passcode, Save.
4. Pages > Add New. Add a "Shortcode" block containing:   [hack_coach]
   Publish. Open the page.
5. Click "Try a sample event" first. It needs no judge search and shows the
   whole flow. Then paste the real event link.

Safer place for keys (optional)
-------------------------------
Add to wp-config.php instead of using the settings page:
  define('HACK_COACH_ANTHROPIC_KEY', 'sk-ant-...');
  define('HACK_COACH_TAVILY_KEY', 'tvly-...');

How it works
------------
1. Event   - fetches the page, extracts theme, sponsors, judges, stack.
2. Judges  - searches public pages per judge, shows findings with source links.
             You confirm each is the right person. Inferences are labelled.
3. Team    - questions about skills, interests, people and hardware.
4. Brief   - three directions, each with a human or physical element and an
             "AI-alone" score, plus plan, pitch beats and judge questions.

Safety built in
---------------
- API keys stay on the server.
- Optional passcode, per-visitor daily limit, and a global daily cap.
- Only public web pages are read. No logins, no scraping behind walls.
- Every judge claim must carry a source link from the search results, or it is dropped.
- Page text is treated as data, not instructions.
- Results are cached (event 6 hours, judge 24 hours) to save cost and time.

Troubleshooting
---------------
- "The server timed out": your host limits PHP run time. Pick a faster model in
  Settings > Hack Coach, or ask your host to raise max_execution_time to 120.
- "Not enough readable text": the event site loads content with JavaScript.
  Open the page, copy all text, paste it in the box on step 1.
- "Check the model name": set the model ID in settings.
- Every visitor shares one limit: your site is behind a proxy/CDN. Ask Claude
  to add the forwarded-IP filter (hack_coach_client_ip).
- Page cache plugins: exclude the page that contains the shortcode.

Not tested
----------
This was written without a PHP or WordPress test environment. Test with the
sample event first, then one real event, before the day you need it.
