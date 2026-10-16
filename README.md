# Hack Scout (Hack Coach)

A hackathon strategy coach, built as a WordPress plugin.

Paste an event link and it reads the theme, sponsors, judges and provided tools. It researches each judge from public pages, links every claim to its source, and labels inference separately from fact. If judges are not published, it searches for them or builds a sponsor panel. After a few questions about your team, it produces three project directions. Each needs a human or physical element and is scored on whether a single AI prompt could produce it, with a plan, pitch beats and likely judge questions.

## Install
1. Download `hack-coach.zip`.
2. WordPress admin: Plugins > Add New Plugin > Upload Plugin, then activate.
3. Settings > Hack Coach: add an Anthropic API key (required) and a Tavily key (for judge search).
4. Add the shortcode `[hack_coach]` to a page.

See `README.txt` for more detail. API keys are stored on your server and are never sent to visitors. Only public web pages are read.

The "Try a sample event" button works without any keys.
