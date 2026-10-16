(function () {
  'use strict';

  var cfg = window.HackCoachCfg || { ep: {}, passcode: false };
  var root = document.getElementById('hack-coach');
  if (!root) { return; }
  document.documentElement.classList.add('hc-full');

  var KEY = 'hackcoach_state_v1';

  /* ---------- sample event (collected by hand from public pages) ---------- */
  var SAMPLE = {
    event: {
      name: 'Real-Time Video Agents Hack, London',
      date: 'Saturday 17 October 2026, 08:30 to 18:30',
      location: 'Halkin, 1-2 Paris Garden, London',
      organizer: 'VAST Data, with NVIDIA, CoreWeave and Weights & Biases',
      theme: 'Build agents that unlock the value of video. Video is hard to search and analyse, so most of it stays unwatched.',
      summary: 'Teams build production-ready video agents in one day using the sponsors\' stack. Demos run at 16:30.',
      criteria: [],
      sponsors: [
        { name: 'VAST Data', what: 'AI data platform that handles video ingestion and the data layer' },
        { name: 'NVIDIA', what: 'Cosmos video understanding models and accelerated computing' },
        { name: 'CoreWeave', what: 'GPU cloud that serves the models' },
        { name: 'Weights & Biases', what: 'LLMs and tools for tracking and evaluating AI applications' }
      ],
      prizes: ['1st place: NVIDIA DGX Spark', 'HuggingFace Microduck', 'Cursor credits', 'Cash gift cards'],
      judges: [],
      stack: [
        { name: 'NVIDIA Cosmos', what: 'Reason over a video clip' },
        { name: 'Semantic search', what: 'Find moments across hours of footage with natural language' },
        { name: 'YOLO', what: 'Real-time detection and tracking across frames' },
        { name: 'Weights & Biases models', what: 'General-purpose LLMs for agent logic' }
      ],
      agenda: [
        { time: '09:30', item: 'Build begins' },
        { time: '12:30', item: 'Lunch' },
        { time: '16:30', item: 'Demos' },
        { time: '18:30', item: 'Closing and awards' }
      ],
      build_window: '09:30 to 16:30',
      team_size: 'Up to 4',
      rules_notes: []
    },
    judges: [
      {
        name: 'Abubakr Karali', title: 'Senior Solutions Architect', company: 'NVIDIA', links: [], status: 'done', confirmed: true,
        result: {
          match: 'good',
          identity_note: 'Name and employer match across the webinar, the Reactor session and his profile.',
          role_summary: 'Solutions architect working on vision AI and video language models at NVIDIA.',
          findings: [
            { text: 'Presented the webinar "Unleashing Video Insights With NVIDIA-Powered VLMs".', kind: 'talk', source_url: 'https://info.nvidia.com/vlm-webinar.html' },
            { text: 'Spoke at a Microsoft Reactor session on deploying computer vision products with NVIDIA and Azure.', kind: 'talk', source_url: 'https://developer.microsoft.com/en-us/reactor/events/18711/' },
            { text: 'Has published computer vision research.', kind: 'writing', source_url: 'https://scholar.google.com/citations?hl=en&user=ACxQHBUAAAAJ' }
          ],
          likely_cares: [{ text: 'Correct use of vision models and real-time behaviour on NVIDIA hardware.', basis: 'Inferred from his video language model talks.' }],
          resources: [],
          sources: []
        }
      },
      {
        name: 'Brian Verkley', title: 'Director, AI Data Platform', company: 'VAST Data', links: [], status: 'done', confirmed: true,
        result: {
          match: 'good',
          identity_note: 'Several sources agree on name, employer and topic.',
          role_summary: 'Writes and speaks about AI-native data infrastructure at VAST Data.',
          findings: [
            { text: 'Interviewed at KubeCon 2025 about VAST as an AI operating system for data.', kind: 'talk', source_url: 'https://www.youtube.com/watch?v=Gz1f7mHhh3E' },
            { text: 'Wrote "5 Ways to Rethink AI Storage and Avoid HPC-Era Pitfalls".', kind: 'writing', source_url: 'https://www.vastdata.com/blog/5-ways-to-rethink-ai-storage-and-avoid-hpc-era-pitfalls' },
            { text: 'Has written for The New Stack on reasoning agents in business and object storage for AI.', kind: 'writing', source_url: 'https://thenewstack.io/author/brian-verkley/' }
          ],
          likely_cares: [{ text: 'Whether the data layer holds up beyond a single demo clip.', basis: 'Inferred from his writing on AI storage and pipelines.' }],
          resources: [{ name: 'VAST blog: 5 Ways to Rethink AI Storage', url: 'https://www.vastdata.com/blog/5-ways-to-rethink-ai-storage-and-avoid-hpc-era-pitfalls', why: 'His own framing of what an AI data foundation needs.' }],
          sources: []
        }
      },
      {
        name: 'Ram B.', title: 'Senior Developer Advocate', company: 'VAST Data', links: [], status: 'done', confirmed: true,
        result: {
          match: 'good',
          identity_note: 'Probably Ram Bansal, but the surname is not on the event page. Confirm before relying on it.',
          role_summary: 'Developer advocate at VAST Data, linked to the Builders Challenge and video search content.',
          findings: [
            { text: 'VAST blog post on building real-time video search and AI summary with VAST DataEngine.', kind: 'writing', source_url: 'https://www.vastdata.com/blog/unlock-video-intelligence-build-real-time-video-search-and-ai-summary' },
            { text: 'Linked to the post introducing the VAST Builders Challenge.', kind: 'hackathon', source_url: 'https://www.vastdata.com/blog/lets-build-introducing-the-vast-builders-challenge' }
          ],
          likely_cares: [{ text: 'Projects that run end to end on the VAST tools.', basis: 'Inferred from posts describing exactly this kind of build.' }],
          resources: [{ name: 'Video search and AI summary walkthrough', url: 'https://www.vastdata.com/blog/unlock-video-intelligence-build-real-time-video-search-and-ai-summary', why: 'A worked example of the pipeline this event asks for.' }],
          sources: []
        }
      },
      {
        name: 'Junaid Butt', title: 'AI Solutions Engineer', company: 'Weights & Biases', links: [], status: 'done', confirmed: true,
        result: {
          match: 'thin',
          identity_note: 'One profile matches. No talks, posts or repositories found.',
          role_summary: 'Works at Weights & Biases and has judged an external hackathon for them.',
          findings: [
            { text: 'Profile lists Weights & Biases and shows he judged the Mistral AI London Hackathon.', kind: 'hackathon', source_url: 'https://www.linkedin.com/in/junaid-butt-23a18314a/' }
          ],
          likely_cares: [],
          resources: [],
          sources: []
        }
      }
    ],
    known: [
      'https://docs.nvidia.com/cosmos/latest/cosmos3/quickstart_guide.html',
      'https://www.vastdata.com/developers',
      'https://luma.com/weavehacks3'
    ]
  };

  /* ---------- sample brief (pre-written, shown only for the sample event) ---------- */
  var SAMPLE_OUT = {
    read: 'This event asks for video agents that turn unwatched footage into something searchable and useful. Two judges come from infrastructure roles, so expect questions about how it runs, not only how it looks.',
    recommended: 0,
    recommended_reason: 'It uses the provided stack end to end, can be built in a day, and the live clip from a judge cannot be faked.',
    directions: [
      {
        title: 'Bring-your-own-clip agent with cited timestamps',
        pitch: 'Hand it any video and ask questions. Every answer links to the exact second.',
        what_it_does: 'A judge or visitor gives you a short video from their own phone. The agent indexes it live, answers questions in plain language, and jumps the player to the moments that answer it.',
        human_element: { type: 'live-input', detail: 'The footage comes from the person judging, live, so nobody can say it was staged.' },
        ai_alone: { score: 'low', reason: 'A chatbot prompt cannot watch a stranger\'s clip. The result depends on the live video.' },
        judge_fit: [
          { judge: 'Abubakr Karali', why: 'Presented a webinar on video language models, so correct use of vision models should matter to him.', source_url: 'https://info.nvidia.com/vlm-webinar.html' },
          { judge: 'Ram B.', why: 'His posts describe video search and summarisation pipelines, which is the same task.', source_url: 'https://www.vastdata.com/blog/unlock-video-intelligence-build-real-time-video-search-and-ai-summary' }
        ],
        stack_use: ['NVIDIA Cosmos for understanding', 'Semantic search over frames', 'VAST for storage', 'Weave tracing'],
        resources: [
          { name: 'Cosmos quickstart', url: 'https://docs.nvidia.com/cosmos/latest/cosmos3/quickstart_guide.html', why: 'Fastest way to run the model.' },
          { name: 'VAST video search walkthrough', url: 'https://www.vastdata.com/blog/unlock-video-intelligence-build-real-time-video-search-and-ai-summary', why: 'A worked example of the pipeline.' }
        ],
        risk: 'Long clips are slow. Limit clip length and sample frames.',
        time_fit: 'A thin version is possible in the first two hours.',
        passion_check: 'Only pick this if you care about footage nobody has time to watch.'
      },
      {
        title: 'Interview-first agent for a real footage problem',
        pitch: 'Build around a problem a real person told you about at the venue.',
        what_it_does: 'Ask two or three people what footage they never get to watch. Build the agent around the most common answer and quote them in the demo.',
        human_element: { type: 'interview', detail: 'A named user you interviewed, quoted on your demo slide.' },
        ai_alone: { score: 'low', reason: 'The problem comes from people, not from a model.' },
        judge_fit: [{ judge: 'Brian Verkley', why: 'Writes about turning stored data into useful agents.', source_url: 'https://www.vastdata.com/blog/5-ways-to-rethink-ai-storage-and-avoid-hpc-era-pitfalls' }],
        stack_use: ['Cosmos', 'Semantic search'],
        resources: [],
        risk: 'Interviews take time away from building.',
        time_fit: 'Do the interviews in the first 30 minutes.',
        passion_check: 'Choose the problem you find most interesting, not the one a judge would like.'
      },
      {
        title: 'Live camera watcher on a physical setup',
        pitch: 'A real object on the table that the audience can touch.',
        what_it_does: 'Point a webcam at a real workspace. Detection tracks objects, the model explains unusual events, and the agent logs them as searchable moments.',
        human_element: { type: 'physical', detail: 'A physical object on the table that the audience can change.' },
        ai_alone: { score: 'medium', reason: 'Much of the pipeline can be written by a chatbot, but the live camera and the physical setup cannot.' },
        judge_fit: [],
        stack_use: ['YOLO detection', 'Cosmos', 'Weights & Biases models'],
        resources: [],
        risk: 'Camera and frame-rate problems. Highest build risk.',
        time_fit: 'Needs a working camera pipeline early.',
        passion_check: 'Pick this only if you enjoy hardware.'
      }
    ],
    plan: [
      { when: 'First hour', task: 'Run one sample clip through the model and get one answer with a timestamp.' },
      { when: 'Next two hours', task: 'Accept a new clip, search it, and show the cited second.' },
      { when: 'Then', task: 'Add tracing so each answer shows what the agent looked at.' },
      { when: 'Last hour', task: 'Freeze features, rehearse the demo with a clip you did not prepare.' }
    ],
    pitch: [
      { beat: 'Problem', line: 'Most video is never watched.' },
      { beat: 'Solution', line: 'An agent you can ask questions of, with proof for every answer.' },
      { beat: 'Demo', line: 'Ask a judge for a clip from their phone and run it live.' },
      { beat: 'How it works', line: 'Cosmos for understanding, search for moments, a trace for trust.' },
      { beat: 'Next', line: 'Live streams and hours of footage.' }
    ],
    challenge_questions: [
      'What happens with a two-hour video?',
      'How do you know an answer is not made up?',
      'What does it cost per minute of footage?',
      'Where does the video live, and who can see it?'
    ],
    ask_the_room: [
      'Ask a mentor which model endpoint is fastest for video.',
      'Ask a judge what footage they wish they could search.',
      'Ask another team for a test clip.'
    ],
    warnings: ['This is a sample brief for the sample event. It does not use your team\'s answers.']
  };

  /* ---------- state ---------- */
  function fresh() {
    return { step: 1, url: '', text: '', event: null, known: [], judges: [], answers: { hours: '7', team: '3' }, out: null, sample: false };
  }
  function load() {
    try {
      var v = localStorage.getItem(KEY);
      if (!v) { return null; }
      var s = JSON.parse(v);
      (s.judges || []).forEach(function (j) { if (j.status === 'loading') { j.status = 'idle'; } });
      return s;
    } catch (e) { return null; }
  }
  var S = load() || fresh();
  var ui = { busy: false, error: '', note: '' };
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage is optional */ } }

  /* ---------- tiny DOM helpers (text only, never innerHTML) ---------- */
  function add(el, c) {
    if (c === null || c === undefined || c === false) { return; }
    if (Array.isArray(c)) { c.forEach(function (x) { add(el, x); }); return; }
    el.appendChild(typeof c === 'object' ? c : document.createTextNode(String(c)));
  }
  function h(tag, attrs) {
    var el = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v === null || v === undefined || v === false) { return; }
      if (k === 'class') { el.className = v; }
      else if (k.slice(0, 2) === 'on') { el.addEventListener(k.slice(2), v); }
      else if (k === 'value') { el.value = v; }
      else { el.setAttribute(k, v === true ? '' : v); }
    });
    for (var i = 2; i < arguments.length; i++) { add(el, arguments[i]); }
    return el;
  }
  function arr(x) { return Array.isArray(x) ? x : []; }
  function str(x) { return x === null || x === undefined ? '' : String(x); }
  function safeUrl(u) { return /^https?:\/\//i.test(str(u)) ? str(u) : null; }
  function link(url, text) {
    var u = safeUrl(url);
    if (!u) { return h('span', {}, text || url); }
    return h('a', { href: u, target: '_blank', rel: 'noopener noreferrer' }, text || u.replace(/^https?:\/\/(www\.)?/i, '').slice(0, 50));
  }
  function pill(kind, text) { return h('span', { class: 'hc-pill ' + kind }, text); }
  function label(t) { return h('div', { class: 'hc-label' }, t); }
  function busy(t) { return h('div', { class: 'hc-busy', role: 'status' }, h('span', { class: 'hc-spin' }), t); }

  /* ---------- API ---------- */
  function pass() { try { return sessionStorage.getItem('hc_pass') || ''; } catch (e) { return ''; } }
  function api(name, body) {
    var headers = { 'Content-Type': 'application/json' };
    var p = pass();
    if (p) { headers['X-HC-Passcode'] = p; }
    return fetch(cfg.ep[name], { method: 'POST', headers: headers, body: JSON.stringify(body) }).then(function (r) {
      return r.text().then(function (t) {
        var j = null;
        try { j = JSON.parse(t); } catch (e) { /* non-JSON reply */ }
        if (!r.ok) {
          var m = (j && j.message) || ([502, 504, 524].indexOf(r.status) > -1
            ? 'The server timed out. Try again, or pick a faster model in the plugin settings.'
            : 'Something went wrong (' + r.status + ').');
          throw new Error(m);
        }
        if (!j) { throw new Error('The server sent an unexpected reply.'); }
        return j;
      });
    }, function () { throw new Error('Could not reach the server. Check your connection.'); });
  }

  function go(step) { S.step = step; ui.error = ''; ui.note = ''; save(); render(); root.scrollTop = 0; }

  /* ---------- actions ---------- */
  function readEvent() {
    ui.busy = true; ui.error = ''; render();
    api('event', { url: S.url, text: S.text }).then(function (res) {
      S.event = res.event;
      S.known = arr(res.links);
      S.sample = false;
      S.out = null;
      ui.sel = 0; ui.dir = undefined; ui.btab = '';
      S.judges = arr(res.event.judges).map(function (j) {
        return { name: j.name, title: j.title || '', company: j.company || '', links: [], status: 'idle', confirmed: true };
      });
      ui.busy = false;
      go(2);
    }).catch(function (e) { ui.busy = false; ui.error = e.message; render(); });
  }

  function loadSample() {
    S = fresh();
    S.event = JSON.parse(JSON.stringify(SAMPLE.event));
    S.judges = JSON.parse(JSON.stringify(SAMPLE.judges));
    S.known = SAMPLE.known.slice();
    S.sample = true;
    ui.sel = 0; ui.dir = undefined; ui.btab = '';
    S.step = 2;
    save(); render();
  }

  function research(j) {
    j.status = 'loading'; j.error = '';
    return api('judge', { name: j.name, title: j.title, company: j.company, event: S.event ? S.event.name : '', links: j.links || [], refresh: !!j.refresh })
      .then(function (res) {
        j.result = res; j.status = 'done'; j.refresh = false;
        j.confirmed = res.match !== 'none';
        arr(res.sources).forEach(function (s) { if (S.known.indexOf(s.url) < 0) { S.known.push(s.url); } });
      })
      .catch(function (e) { j.status = 'error'; j.error = e.message; })
      .then(function () { save(); render(); });
  }

  function researchAll() {
    var todo = S.judges.filter(function (j) { return j.name && j.status !== 'done' && j.status !== 'loading'; });
    todo.forEach(function (j) { j.status = 'loading'; });
    render();
    todo.forEach(research);
  }

  function buildBrief() {
    var judges = S.judges.filter(function (j) { return j.status === 'done' && j.confirmed; })
      .map(function (j) { return { name: j.name, title: j.title, company: j.company, result: j.result }; });
    ui.busy = true; ui.error = ''; render();
    if (S.sample) {
      setTimeout(function () { S.out = JSON.parse(JSON.stringify(SAMPLE_OUT)); ui.busy = false; go(4); }, 900);
      return;
    }
    api('directions', { event: S.event, judges: judges, answers: S.answers, known_urls: S.known }).then(function (res) {
      S.out = res; ui.busy = false; go(4);
    }).catch(function (e) { ui.busy = false; ui.error = e.message; render(); });
  }

  /* ---------- markdown export ---------- */
  function toMarkdown() {
    var e = S.event || {}, o = S.out || {}, L = [];
    L.push('# Hack Coach brief: ' + str(e.name));
    if (e.date || e.location) { L.push(str(e.date) + (e.date && e.location ? ' | ' : '') + str(e.location)); }
    L.push('', '## What this event rewards', str(o.read));
    L.push('', '## Judges');
    S.judges.filter(function (j) { return j.status === 'done' && j.confirmed; }).forEach(function (j) {
      L.push('', '### ' + j.name + (j.title ? ', ' + j.title : '') + (j.company ? ', ' + j.company : ''));
      L.push('Public record: ' + str(j.result.match) + '. ' + str(j.result.identity_note));
      arr(j.result.findings).forEach(function (f) { L.push('- ' + f.text + ' (' + f.source_url + ')'); });
      arr(j.result.likely_cares).forEach(function (c) { L.push('- Inference: ' + c.text); });
    });
    L.push('', '## Directions');
    arr(o.directions).forEach(function (d, i) {
      L.push('', '### ' + (i === o.recommended ? '[Recommended] ' : '') + str(d.title), str(d.pitch), '', str(d.what_it_does));
      L.push('- Human element (' + str(d.human_element && d.human_element.type) + '): ' + str(d.human_element && d.human_element.detail));
      L.push('- AI-alone test: ' + str(d.ai_alone && d.ai_alone.score) + '. ' + str(d.ai_alone && d.ai_alone.reason));
      arr(d.judge_fit).forEach(function (f) { L.push('- Fits ' + f.judge + ': ' + f.why + (f.source_url ? ' (' + f.source_url + ')' : '')); });
      arr(d.stack_use).forEach(function (s) { L.push('- Uses: ' + s); });
      arr(d.resources).forEach(function (r) { L.push('- Resource: ' + r.name + (r.url ? ' (' + r.url + ')' : '') + '. ' + r.why); });
      L.push('- Risk: ' + str(d.risk), '- Time: ' + str(d.time_fit));
      if (d.passion_check) { L.push('- Passion check: ' + d.passion_check); }
    });
    L.push('', 'Why the recommended one: ' + str(o.recommended_reason));
    L.push('', '## Plan');
    arr(o.plan).forEach(function (p) { L.push('- ' + p.when + ': ' + p.task); });
    L.push('', '## Pitch beats');
    arr(o.pitch).forEach(function (p) { L.push('- ' + p.beat + ': ' + p.line); });
    L.push('', '## Questions a judge could ask');
    arr(o.challenge_questions).forEach(function (q) { L.push('- ' + q); });
    L.push('', '## Ask the room early');
    arr(o.ask_the_room).forEach(function (q) { L.push('- ' + q); });
    if (arr(o.warnings).length) { L.push('', '## Watch out'); arr(o.warnings).forEach(function (q) { L.push('- ' + q); }); }
    L.push('', 'Judge notes come from public pages and are not statements by the judges. "Inference" lines are guesses.');
    return L.join('\n');
  }

  function copyBrief(btn) {
    var t = toMarkdown();
    var done = function () { btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = 'Copy brief'; }, 1800); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(t).then(done, function () { fallbackCopy(t, done); });
    } else { fallbackCopy(t, done); }
  }
  function fallbackCopy(t, done) {
    var ta = h('textarea', { 'aria-hidden': 'true', style: 'position:fixed;left:-9999px' });
    ta.value = t; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); done(); } catch (e) { /* user can use download */ }
    document.body.removeChild(ta);
  }
  function downloadBrief() {
    var blob = new Blob([toMarkdown()], { type: 'text/markdown' });
    var a = h('a', { href: URL.createObjectURL(blob), download: 'hack-coach-brief.md' });
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
  }

  /* ---------- views ---------- */
  function hue(s) { var x = 7; s = str(s); for (var i = 0; i < s.length; i++) { x = (x * 31 + s.charCodeAt(i)) % 360; } return x; }
  function initials(n) {
    var p = str(n).replace(/[^A-Za-z\s.]/g, '').split(/\s+/).filter(Boolean);
    if (!p.length) { return '?'; }
    return (p[0][0] + (p.length > 1 ? p[p.length - 1][0] : '')).toUpperCase();
  }
  function avatar(name, big) {
    return h('span', { class: 'hc-av' + (big ? ' big' : ''), style: 'background:hsl(' + hue(name) + ' 42% 34%)' }, initials(name));
  }
  function chip(text, active, onclick) {
    return h('button', { type: 'button', class: 'hc-chip' + (active ? ' on' : ''), 'aria-pressed': active ? 'true' : 'false', onclick: onclick }, text);
  }
  function errBox() { return ui.error ? h('div', { class: 'hc-err', role: 'alert' }, ui.error) : null; }
  function bar(pct) { return h('div', { class: 'hc-bar', role: 'progressbar', 'aria-valuenow': String(pct), 'aria-valuemin': '0', 'aria-valuemax': '100' }, h('i', { style: 'width:' + pct + '%' })); }
  function tabBar(items, current, onpick) {
    return h('div', { class: 'hc-tabs', role: 'tablist' }, items.map(function (t) {
      return h('button', { type: 'button', role: 'tab', class: 'hc-tab' + (t[0] === current ? ' on' : ''), 'aria-selected': t[0] === current ? 'true' : 'false', onclick: function () { onpick(t[0]); } },
        t[1], (t[2] || t[2] === 0) && t[2] !== '' ? h('span', { class: 'ct' }, String(t[2])) : null);
    }));
  }
  function passBox() {
    if (!cfg.passcode) { return null; }
    return h('div', { class: 'hc-field hc-pass' },
      h('label', { for: 'hc-pass' }, 'Passcode'),
      h('input', { id: 'hc-pass', type: 'password', autocomplete: 'off', value: pass(), oninput: function (e) { try { sessionStorage.setItem('hc_pass', e.target.value); } catch (x) { /* optional */ } } })
    );
  }

  function canGo(k) { return k === 1 || (k <= 3 && !!S.event) || (k === 4 && !!S.out); }
  function topbar() {
    var names = ['Event', 'Judges', 'Team', 'Brief'];
    return h('nav', { class: 'hc-top', 'aria-label': 'Progress' },
      h('div', { class: 'hc-brand' }, h('span', { class: 'hc-logo' }, 'H'), 'Hack Coach'),
      h('ol', { class: 'hc-steps' }, names.map(function (n, i) {
        var k = i + 1, on = k === S.step, ok = canGo(k);
        return h('li', { class: (on ? 'on ' : '') + (k < S.step ? 'done' : '') },
          h('button', { type: 'button', class: 'hc-step', disabled: ok ? null : true, 'aria-current': on ? 'step' : null, onclick: function () { if (ok) { go(k); } } },
            h('span', { class: 'n' }, k < S.step ? '✓' : String(k)), h('span', { class: 'tx' }, n)));
      })),
      h('a', { class: 'hc-site', href: '/' }, 'Back to site'));
  }

  /* ----- step 1 ----- */
  function feat(n, t, d) { return h('div', { class: 'hc-feat' }, h('span', { class: 'hc-featn' }, n), h('b', {}, t), h('span', {}, d)); }

  function viewEvent() {
    var url = h('input', {
      id: 'hc-url', type: 'url', placeholder: 'Paste a hackathon link, for example https://luma.com/...', value: S.url, 'aria-label': 'Event link',
      oninput: function (e) { S.url = e.target.value; save(); },
      onkeydown: function (e) { if (e.key === 'Enter' && !ui.busy) { readEvent(); } }
    });
    return h('div', { class: 'hc-view hc-hero' },
      h('div', { class: 'hc-herotxt' },
        label('Hackathon strategy coach'),
        h('h1', {}, 'Walk in knowing what wins.'),
        h('p', { class: 'hc-lead' }, 'Paste an event link. Hack Coach reads the brief, researches the judges from public pages, then coaches your team toward ideas a single AI prompt could not produce.')),
      passBox(),
      h('div', { class: 'hc-search' }, url,
        h('button', { class: 'hc-btn', type: 'button', disabled: ui.busy ? true : null, onclick: readEvent },
          ui.busy ? [h('span', { class: 'hc-spin on-accent' }), 'Reading event'] : 'Read event')),
      ui.busy ? h('p', { class: 'hc-muted hc-small', role: 'status' }, 'This takes about 10 to 20 seconds.') : null,
      errBox(),
      h('details', { class: 'hc-paste' },
        h('summary', {}, 'The page will not load? Paste its text instead'),
        h('div', { class: 'hc-field' },
          h('label', { for: 'hc-text' }, 'Event page text'),
          h('textarea', { id: 'hc-text', rows: 6, placeholder: 'Open the event page, select everything, copy, and paste here.', value: S.text, oninput: function (e) { S.text = e.target.value; save(); } }))),
      h('div', { class: 'hc-row' },
        h('button', { class: 'hc-btn ghost', type: 'button', onclick: loadSample }, 'Try a sample event'),
        h('span', { class: 'hc-muted hc-small' }, 'Shows the whole flow with no waiting.')),
      h('div', { class: 'hc-feats' },
        feat('1', 'Reads the event', 'Theme, sponsors, judges and the stack you are given.'),
        feat('2', 'Researches judges', 'Public pages only. Every claim links to its source.'),
        feat('3', 'Builds AI-proof ideas', 'Each direction gets a human element and an AI-alone rating.'))
    );
  }

  /* ----- step 2 ----- */
  function selJudge() { var i = ui.sel || 0; if (i >= S.judges.length) { i = 0; } return i; }

  function infoGroup(key, title, items) {
    if (!arr(items).length) { return null; }
    var open = ui.chip && ui.chip.key === key ? ui.chip : null;
    return h('div', { class: 'hc-block' }, label(title),
      h('div', { class: 'hc-chips' }, items.map(function (s, i) {
        var on = !!(open && open.i === i);
        return chip(s.name, on, function () { ui.chip = on ? null : { key: key, i: i }; render(); });
      })),
      open && items[open.i] ? h('p', { class: 'hc-chipinfo hc-small' }, items[open.i].what || 'No description given.') : null);
  }

  function dossier() {
    var e = S.event;
    function meta(k, v) { return v ? h('div', { class: 'hc-meta' }, h('span', {}, k), h('b', {}, v)) : null; }
    return h('aside', { class: 'hc-dossier' },
      h('div', { class: 'hc-row' }, label('Event'), S.sample ? pill('info', 'Sample') : null),
      h('h2', {}, e.name),
      h('div', { class: 'hc-metas' }, meta('When', e.date), meta('Where', e.location), meta('Run by', e.organizer), meta('Build time', e.build_window), meta('Team size', e.team_size)),
      e.theme ? h('div', { class: 'hc-block' }, label('Theme'), h('p', {}, e.theme)) : null,
      h('div', { class: 'hc-block' }, label('Judged on'),
        arr(e.criteria).length ? h('ul', {}, e.criteria.map(function (c) { return h('li', {}, c); })) : h('p', { class: 'hc-muted hc-small' }, 'Not stated on the page.')),
      infoGroup('sp', 'Sponsors (tap for detail)', e.sponsors),
      infoGroup('st', 'Provided stack (tap for detail)', e.stack),
      arr(e.prizes).length ? h('details', { class: 'hc-block' }, h('summary', {}, 'Prizes'), h('ul', {}, e.prizes.map(function (p) { return h('li', {}, p); }))) : null
    );
  }

  function statusDot(j) {
    if (j.status === 'loading') { return h('span', { class: 'hc-spin' }); }
    if (j.status === 'error') { return h('span', { class: 'hc-dot bad', title: 'Search failed' }); }
    if (j.status === 'done' && j.result) {
      var m = j.result.match;
      return h('span', { class: 'hc-dot ' + (m === 'good' ? 'ok' : (m === 'thin' ? 'warn' : 'bad')), title: m === 'good' ? 'Good public record' : (m === 'thin' ? 'Thin public record' : 'Nothing found') });
    }
    return h('span', { class: 'hc-dot idle', title: 'Not researched yet' });
  }

  function tile(j, i) {
    var on = i === selJudge();
    return h('button', { type: 'button', class: 'hc-tile' + (on ? ' on' : ''), 'aria-pressed': on ? 'true' : 'false', onclick: function () { ui.sel = i; ui.jtab = ''; render(); } },
      avatar(j.name),
      h('span', { class: 'hc-tile-t' }, h('b', {}, j.name || 'New judge'), h('small', {}, [j.title, j.company].filter(Boolean).join(' · ') || 'Add details')),
      statusDot(j));
  }

  function editFields(j, i) {
    return h('div', { class: 'hc-view', style: 'gap:16px' },
      h('div', { class: 'hc-jedit' },
        h('div', { class: 'hc-field' }, h('label', { for: 'jn' + i }, 'Name'),
          h('input', { id: 'jn' + i, type: 'text', value: j.name, oninput: function (e) { j.name = e.target.value; j.status = j.status === 'done' ? 'idle' : j.status; save(); } })),
        h('div', { class: 'hc-field' }, h('label', { for: 'jt' + i }, 'Title'),
          h('input', { id: 'jt' + i, type: 'text', value: j.title, oninput: function (e) { j.title = e.target.value; save(); } })),
        h('div', { class: 'hc-field' }, h('label', { for: 'jc' + i }, 'Company'),
          h('input', { id: 'jc' + i, type: 'text', value: j.company, oninput: function (e) { j.company = e.target.value; save(); } }))),
      h('div', { class: 'hc-field' }, h('label', { for: 'jl' + i }, 'Profile links (optional, one per line, up to 3). More reliable than search.'),
        h('textarea', { id: 'jl' + i, rows: 3, value: (j.links || []).join('\n'), oninput: function (e) {
          j.links = e.target.value.split(/\s+/).filter(function (x) { return /^https?:\/\//i.test(x); }).slice(0, 3); save();
        } })),
      h('div', { class: 'hc-row' },
        h('button', { class: 'hc-btn small', type: 'button', onclick: function () { j.refresh = true; research(j); render(); } }, j.status === 'done' ? 'Search again' : 'Research this judge'),
        h('button', { class: 'hc-btn ghost small danger', type: 'button', onclick: function () { S.judges.splice(i, 1); ui.sel = 0; save(); render(); } }, 'Remove judge')));
  }

  function judgeDetail(j, i) {
    var r = j.status === 'done' ? j.result : null;
    var tabs = r ? [['findings', 'Findings', arr(r.findings).length], ['inference', 'Inference', arr(r.likely_cares).length],
      ['resources', 'Resources', arr(r.resources).length], ['sources', 'Sources', arr(r.sources).length], ['edit', 'Edit', '']] : [['edit', 'Details', '']];
    var cur = r ? (ui.jtab || 'findings') : 'edit';
    if (!tabs.some(function (t) { return t[0] === cur; })) { cur = tabs[0][0]; }

    var body;
    if (j.status === 'loading') { body = busy('Searching public pages for ' + (j.name || 'this judge') + '...'); }
    else if (cur === 'edit') {
      body = h('div', { class: 'hc-view', style: 'gap:14px' },
        j.status === 'error' ? h('div', { class: 'hc-err' }, j.error) : null,
        !r && j.status !== 'error' ? h('p', { class: 'hc-muted' }, 'Not researched yet. Check the details, then research.') : null,
        editFields(j, i));
    } else if (cur === 'findings') {
      body = arr(r.findings).length ? h('div', { class: 'hc-list' }, r.findings.map(function (f) {
        return h('div', { class: 'hc-item' }, f.kind ? h('span', { class: 'hc-kind' }, f.kind) : null, h('p', {}, f.text), h('span', { class: 'hc-small' }, link(f.source_url, 'Open source')));
      })) : h('p', { class: 'hc-muted' }, 'No sourced findings. Add a profile link under Edit and search again.');
    } else if (cur === 'inference') {
      body = h('div', { class: 'hc-view', style: 'gap:12px' },
        h('p', { class: 'hc-callout warn hc-small' }, 'These are guesses based on public work. They are not statements from the judge.'),
        arr(r.likely_cares).length ? h('div', { class: 'hc-list' }, r.likely_cares.map(function (c) {
          return h('div', { class: 'hc-item' }, h('p', {}, c.text), c.basis ? h('span', { class: 'hc-small hc-muted' }, 'Basis: ' + c.basis) : null);
        })) : h('p', { class: 'hc-muted' }, 'Nothing to infer from the sources found.'));
    } else if (cur === 'resources') {
      body = arr(r.resources).length ? h('div', { class: 'hc-list' }, r.resources.map(function (x) {
        return h('div', { class: 'hc-item' }, h('b', {}, link(x.url, x.name)), x.why ? h('p', { class: 'hc-small hc-muted' }, x.why) : null);
      })) : h('p', { class: 'hc-muted' }, 'No resources of their own were found.');
    } else {
      body = arr(r.sources).length ? h('ul', {}, r.sources.map(function (s) { return h('li', {}, link(s.url, s.title || s.url)); })) : h('p', { class: 'hc-muted' }, 'No source list for this judge.');
    }

    var kind = r ? (r.match === 'good' ? 'ok' : (r.match === 'thin' ? 'warn' : 'bad')) : null;
    var text = r ? (r.match === 'good' ? 'Good public record' : (r.match === 'thin' ? 'Thin public record' : 'Nothing reliable found')) : '';
    return h('div', { class: 'hc-detail' },
      h('div', { class: 'hc-dhead' }, avatar(j.name, true),
        h('div', { class: 'hc-dname' }, h('h3', {}, j.name || 'New judge'), h('span', { class: 'hc-muted' }, [j.title, j.company].filter(Boolean).join(' · ') || 'Add a title and company'),
          r ? h('div', { class: 'hc-row' }, pill(kind, text)) : null),
        r ? h('label', { class: 'hc-switch' }, h('input', { type: 'checkbox', checked: j.confirmed ? true : null, onchange: function (e) { j.confirmed = e.target.checked; save(); } }), h('span', {}, 'Right person')) : null),
      r && r.identity_note ? h('p', { class: 'hc-callout hc-small' }, r.identity_note) : null,
      r && r.role_summary ? h('p', {}, r.role_summary) : null,
      tabBar(tabs, cur, function (t) { ui.jtab = t; render(); }),
      h('div', { class: 'hc-tabbody' }, body));
  }

  function viewJudges() {
    var total = S.judges.length;
    var done = S.judges.filter(function (j) { return j.status === 'done'; }).length;
    var pending = S.judges.some(function (j) { return j.status === 'loading'; });
    var anyIdle = S.judges.some(function (j) { return j.name && j.status !== 'done' && j.status !== 'loading'; });
    var i = selJudge(), j = S.judges[i];
    return h('div', { class: 'hc-view hc-split' },
      dossier(),
      h('div', { class: 'hc-main' },
        h('div', { class: 'hc-head' },
          h('div', {}, label('Step 2'), h('h2', {}, 'Who is judging')),
          h('div', { class: 'hc-row' },
            anyIdle ? h('button', { class: 'hc-btn', type: 'button', disabled: pending ? true : null, onclick: researchAll }, pending ? 'Researching...' : 'Research all judges') : null)),
        total ? h('div', { class: 'hc-progrow' }, bar(Math.round(done / total * 100)), h('span', { class: 'hc-small hc-muted' }, done + ' of ' + total + ' researched')) : null,
        h('p', { class: 'hc-muted hc-small' }, 'Public pages only. Names can match the wrong person, so confirm each one before it is used.'),
        h('div', { class: 'hc-roster' },
          S.judges.map(tile),
          h('button', { type: 'button', class: 'hc-tile add', onclick: function () {
            S.judges.push({ name: '', title: '', company: '', links: [], status: 'idle', confirmed: true });
            ui.sel = S.judges.length - 1; ui.jtab = ''; save(); render();
          } }, h('span', { class: 'hc-av plus' }, '+'), h('span', { class: 'hc-tile-t' }, h('b', {}, 'Add a judge'), h('small', {}, 'Name, title, company')))),
        j ? judgeDetail(j, i) : h('p', { class: 'hc-callout' }, 'No judges were found on the page. Add one above, or continue without.'),
        h('div', { class: 'hc-actions' },
          h('button', { class: 'hc-btn ghost', type: 'button', onclick: function () { go(1); } }, 'Back'),
          h('button', { class: 'hc-btn', type: 'button', onclick: function () { go(3); } }, anyIdle ? 'Skip judges and continue' : 'Next: your team'))
      )
    );
  }

  /* ----- step 3 ----- */
  var QUESTIONS = [
    { k: 'skills', t: 'What can your team build well?', p: 'Languages, frameworks, ML, hardware, design.', c: ['Python', 'JavaScript', 'React', 'Machine learning', 'Hardware', 'Design', 'Mobile apps', 'Data engineering'] },
    { k: 'interests', t: 'What do you actually care about?', p: 'A problem you have lived, a field you love. This should beat any judge preference.', c: ['Education', 'Health', 'Accessibility', 'Climate', 'Security', 'Creative tools', 'Sport'] },
    { k: 'people', t: 'Who could you talk to before demo day?', p: 'A person with a real problem, a mentor, someone in the room.', c: ['A classmate', 'A mentor here', 'A user I know', 'A judge', 'Another team'] },
    { k: 'hardware', t: 'What physical things or devices do you have?', p: 'Cameras, a phone, sensors, a Raspberry Pi, a robot, anything.', c: ['Laptop only', 'Phone camera', 'Webcam', 'Raspberry Pi', 'Sensors', 'Microphone'] },
    { k: 'avoid', t: 'What have you seen before or do not want to build?', p: 'Optional.', c: ['Chatbot', 'Study planner', 'Dashboard', 'Wrapper around one prompt'] }
  ];
  function hasTok(k, tok) { return (S.answers[k] || '').toLowerCase().indexOf(tok.toLowerCase()) > -1; }
  function toggleTok(k, tok) {
    var cur = S.answers[k] || '';
    if (hasTok(k, tok)) {
      var re = new RegExp('(^|,\\s*)' + tok.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?=,|$)', 'i');
      cur = cur.replace(re, '').replace(/^\s*,\s*/, '');
    } else { cur = cur ? cur + ', ' + tok : tok; }
    S.answers[k] = cur; save(); render();
  }

  function viewTeam() {
    var core = ['skills', 'interests', 'people', 'hardware'];
    var answered = core.filter(function (k) { return (S.answers[k] || '').trim(); }).length;
    var judgesUsed = S.judges.filter(function (j) { return j.status === 'done' && j.confirmed; }).length;
    var cards = QUESTIONS.map(function (q, qi) {
      var filled = (S.answers[q.k] || '').trim() !== '';
      return h('div', { class: 'hc-qcard' + (filled ? ' filled' : '') },
        h('div', { class: 'hc-row' }, h('span', { class: 'hc-qn' }, filled ? '✓' : String(qi + 1)), h('label', { for: 'q-' + q.k, class: 'hc-qt' }, q.t)),
        h('div', { class: 'hc-chips' }, q.c.map(function (c) { return chip(c, hasTok(q.k, c), function () { toggleTok(q.k, c); }); })),
        h('textarea', { id: 'q-' + q.k, rows: 2, placeholder: q.p, value: S.answers[q.k] || '', oninput: function (e) { S.answers[q.k] = e.target.value; save(); } }));
    });
    return h('div', { class: 'hc-view hc-split' },
      h('aside', { class: 'hc-dossier' },
        label('Step 3'), h('h2', {}, 'Your team'),
        h('p', { class: 'hc-muted' }, 'The more specific you are, the less generic the ideas. Directions are built from your skills, your people and your hardware.'),
        h('div', { class: 'hc-block' }, label('Coach inputs'),
          h('div', { class: 'hc-progrow' }, bar(Math.round(answered / core.length * 100)), h('span', { class: 'hc-small hc-muted' }, answered + ' of ' + core.length)),
          h('ul', { class: 'hc-checks' },
            h('li', { class: S.event ? 'ok' : '' }, 'Event read'),
            h('li', { class: judgesUsed ? 'ok' : '' }, judgesUsed + ' judge' + (judgesUsed === 1 ? '' : 's') + ' confirmed'),
            h('li', { class: answered === core.length ? 'ok' : '' }, 'Team questions'))),
        h('div', { class: 'hc-grid' },
          h('div', { class: 'hc-field' }, h('label', { for: 'q-hours' }, 'Hours to build'),
            h('input', { id: 'q-hours', type: 'number', min: 1, max: 72, value: S.answers.hours || '', oninput: function (e) { S.answers.hours = e.target.value; save(); } })),
          h('div', { class: 'hc-field' }, h('label', { for: 'q-team' }, 'Team size'),
            h('input', { id: 'q-team', type: 'number', min: 1, max: 10, value: S.answers.team || '', oninput: function (e) { S.answers.team = e.target.value; save(); } })))
      ),
      h('div', { class: 'hc-main' },
        h('div', { class: 'hc-qs' }, cards),
        errBox(),
        h('div', { class: 'hc-actions' },
          h('button', { class: 'hc-btn ghost', type: 'button', disabled: ui.busy ? true : null, onclick: function () { go(2); } }, 'Back'),
          h('button', { class: 'hc-btn', type: 'button', disabled: ui.busy ? true : null, onclick: buildBrief },
            ui.busy ? [h('span', { class: 'hc-spin on-accent' }), 'Building your brief'] : 'Build my brief')),
        ui.busy ? h('p', { class: 'hc-muted hc-small', role: 'status' }, 'This takes 20 to 60 seconds.') : null)
    );
  }

  /* ----- step 4 ----- */
  function gauge(score) {
    var n = score === 'low' ? 1 : (score === 'high' ? 3 : 2);
    var cls = score === 'low' ? 'ok' : (score === 'high' ? 'bad' : 'warn');
    var txt = score === 'low' ? 'Hard for AI alone' : (score === 'high' ? 'AI could do this alone' : 'Partly AI-doable');
    return h('div', { class: 'hc-gauge ' + cls, role: 'img', 'aria-label': 'AI-alone risk: ' + txt },
      h('span', { class: 'hc-small hc-muted' }, 'AI-alone risk'),
      h('span', { class: 'bars' }, [1, 2, 3].map(function (k) { return h('i', { class: k <= n ? 'f' : '' }); })),
      h('b', {}, txt));
  }

  function checks() { S.checks = S.checks || { plan: {}, pitch: {}, notes: {} }; return S.checks; }

  function directionDetail(d, i, o) {
    var he = d.human_element || {}, ai = d.ai_alone || {};
    function rowd(t, v) { return v ? h('div', { class: 'hc-kv' }, h('span', {}, t), h('div', {}, v)) : null; }
    return h('div', { class: 'hc-detail' },
      h('div', { class: 'hc-row' }, i === o.recommended ? pill('info', 'Recommended') : null),
      h('h3', { class: 'hc-dtitle' }, d.title),
      d.pitch ? h('p', { class: 'hc-lead' }, d.pitch) : null,
      d.what_it_does ? h('p', {}, d.what_it_does) : null,
      h('div', { class: 'hc-two' },
        h('div', { class: 'hc-box' }, label('Human element' + (he.type ? ' · ' + he.type : '')), h('p', {}, he.detail || '')),
        h('div', { class: 'hc-box' }, gauge(ai.score), h('p', { class: 'hc-small' }, ai.reason || ''))),
      arr(d.judge_fit).length ? h('div', { class: 'hc-block' }, label('Judge fit'),
        h('div', { class: 'hc-list' }, d.judge_fit.map(function (f) {
          return h('div', { class: 'hc-item' }, h('div', { class: 'hc-row' }, avatar(f.judge), h('b', {}, f.judge)), h('p', { class: 'hc-small' }, f.why + ' ', f.source_url ? link(f.source_url, 'source') : null));
        }))) : null,
      arr(d.stack_use).length ? h('div', { class: 'hc-block' }, label('Uses'), h('div', { class: 'hc-chips static' }, d.stack_use.map(function (s) { return h('span', { class: 'hc-chip' }, s); }))) : null,
      arr(d.resources).length ? h('div', { class: 'hc-block' }, label('Resources to use'),
        h('ul', {}, d.resources.map(function (r) { return h('li', {}, r.url ? link(r.url, r.name) : r.name, r.why ? ': ' + r.why : ''); }))) : null,
      h('div', { class: 'hc-kvs' }, rowd('Time', d.time_fit), rowd('Risk', d.risk), rowd('Passion check', d.passion_check))
    );
  }

  function checklist(items, store, titleKey, textKey) {
    var c = checks()[store];
    var done = items.filter(function (x, i) { return c[i]; }).length;
    return h('div', { class: 'hc-view', style: 'gap:14px' },
      h('div', { class: 'hc-progrow' }, bar(items.length ? Math.round(done / items.length * 100) : 0), h('span', { class: 'hc-small hc-muted' }, done + ' of ' + items.length + ' done')),
      h('div', { class: 'hc-list' }, items.map(function (x, i) {
        return h('button', { type: 'button', class: 'hc-check' + (c[i] ? ' on' : ''), 'aria-pressed': c[i] ? 'true' : 'false', onclick: function () { c[i] = !c[i]; save(); render(); } },
          h('span', { class: 'box' }, c[i] ? '✓' : ''),
          h('span', { class: 'ct' }, h('span', { class: 'hc-label' }, str(x[titleKey])), h('span', {}, str(x[textKey]))));
      })));
  }

  function viewBrief() {
    var o = S.out;
    if (!o) { return h('div', { class: 'hc-view' }, h('p', {}, 'No brief yet.'), h('button', { class: 'hc-btn', type: 'button', onclick: function () { go(3); } }, 'Back to your team')); }
    var dirs = arr(o.directions);
    var di = ui.dir === undefined || ui.dir >= dirs.length ? o.recommended || 0 : ui.dir;
    var bt = ui.btab || 'dirs';
    var copyBtn = h('button', { class: 'hc-btn small', type: 'button', onclick: function () { copyBrief(copyBtn); } }, 'Copy brief');

    var body;
    if (bt === 'dirs') {
      body = h('div', { class: 'hc-view', style: 'gap:18px' },
        h('div', { class: 'hc-dirs' }, dirs.map(function (d, i) {
          var on = i === di, ai = d.ai_alone || {};
          return h('button', { type: 'button', class: 'hc-dirtab' + (on ? ' on' : ''), 'aria-pressed': on ? 'true' : 'false', onclick: function () { ui.dir = i; render(); } },
            h('span', { class: 'hc-dl' }, String.fromCharCode(65 + i)),
            h('span', { class: 'hc-dt' }, h('b', {}, d.title), h('small', {}, (i === o.recommended ? 'Recommended · ' : '') + (ai.score === 'low' ? 'Hard for AI alone' : (ai.score === 'high' ? 'AI could do this' : 'Partly AI-doable')))));
        })),
        dirs[di] ? directionDetail(dirs[di], di, o) : null,
        o.recommended_reason ? h('p', { class: 'hc-callout' }, h('b', {}, 'Why the recommended one: '), o.recommended_reason) : null);
    } else if (bt === 'plan') {
      body = arr(o.plan).length ? checklist(o.plan, 'plan', 'when', 'task') : h('p', { class: 'hc-muted' }, 'No plan returned.');
    } else if (bt === 'pitch') {
      body = arr(o.pitch).length ? h('div', { class: 'hc-view', style: 'gap:10px' }, h('p', { class: 'hc-muted hc-small' }, 'Tick each beat once you have rehearsed it out loud.'), checklist(o.pitch, 'pitch', 'beat', 'line')) : h('p', { class: 'hc-muted' }, 'No pitch returned.');
    } else {
      var notes = checks().notes;
      body = h('div', { class: 'hc-view', style: 'gap:22px' },
        arr(o.warnings).length ? h('div', { class: 'hc-callout warn' }, h('b', {}, 'Watch out'), h('ul', {}, o.warnings.map(function (w) { return h('li', {}, w); }))) : null,
        arr(o.challenge_questions).length ? h('div', { class: 'hc-block' }, label('Questions a judge could ask. Write your answer.'),
          h('div', { class: 'hc-list' }, o.challenge_questions.map(function (q, i) {
            return h('div', { class: 'hc-item' }, h('b', {}, q),
              h('textarea', { id: 'note' + i, rows: 2, placeholder: 'Your answer', value: notes[i] || '', oninput: function (e) { notes[i] = e.target.value; save(); } }));
          }))) : null,
        arr(o.ask_the_room).length ? h('div', { class: 'hc-block' }, label('Ask the room early'), h('ul', {}, o.ask_the_room.map(function (q) { return h('li', {}, q); }))) : null);
    }

    return h('div', { class: 'hc-view' },
      h('div', { class: 'hc-head' },
        h('div', {}, label('Step 4'), h('div', { class: 'hc-row' }, h('h2', {}, 'Your brief'), S.sample ? pill('info', 'Sample brief') : null)),
        h('div', { class: 'hc-row' }, copyBtn,
          h('button', { class: 'hc-btn ghost small', type: 'button', onclick: downloadBrief }, 'Download .md'),
          h('button', { class: 'hc-btn ghost small', type: 'button', onclick: function () { go(3); } }, 'Change answers'),
          h('button', { class: 'hc-btn ghost small danger', type: 'button', onclick: function () { S = fresh(); ui.sel = 0; ui.dir = undefined; ui.btab = ''; save(); render(); } }, 'Start over'))),
      o.read ? h('p', { class: 'hc-lead' }, o.read) : null,
      tabBar([['dirs', 'Directions', dirs.length], ['plan', 'Plan', arr(o.plan).length], ['pitch', 'Pitch', arr(o.pitch).length], ['prep', 'Prepare', arr(o.challenge_questions).length]], bt, function (t) { ui.btab = t; render(); }),
      h('div', { class: 'hc-tabbody wide' }, body),
      h('p', { class: 'hc-small hc-muted' }, 'Judge notes come from public pages and are not statements by the judges. Inference is a guess. Build for a problem you care about first.')
    );
  }

  function render() {
    var top = root.scrollTop;
    var ae = document.activeElement;
    var aid = ae && ae.id && root.contains(ae) ? ae.id : null;
    var ss = null, se = null;
    if (aid && typeof ae.selectionStart === 'number') { ss = ae.selectionStart; se = ae.selectionEnd; }
    root.textContent = '';
    if (S.step > 1 && !S.event) { S.step = 1; }
    var view = S.step === 2 ? viewJudges() : (S.step === 3 ? viewTeam() : (S.step === 4 ? viewBrief() : viewEvent()));
    root.appendChild(topbar());
    root.appendChild(h('div', { class: 'hc-page' }, view));
    root.scrollTop = top;
    if (aid) {
      var n = document.getElementById(aid);
      if (n) { n.focus(); try { if (ss !== null) { n.setSelectionRange(ss, se); } } catch (x) { /* not a text field */ } }
    }
  }

  render();
})();
