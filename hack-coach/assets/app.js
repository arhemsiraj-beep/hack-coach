(function () {
  'use strict';

  var cfg = window.HackCoachCfg || { ep: {}, passcode: false };
  var root = document.getElementById('hack-coach');
  if (!root) { return; }

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

  function go(step) { S.step = step; ui.error = ''; ui.note = ''; save(); render(); window.scrollTo && root.scrollIntoView({ behavior: 'smooth', block: 'start' }); }

  /* ---------- actions ---------- */
  function readEvent() {
    ui.busy = true; ui.error = ''; render();
    api('event', { url: S.url, text: S.text }).then(function (res) {
      S.event = res.event;
      S.known = arr(res.links);
      S.sample = false;
      S.out = null;
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
  function stepper() {
    var names = ['Event', 'Judges', 'Team', 'Brief'];
    return h('ol', { class: 'hc-steps' }, names.map(function (n, i) {
      var k = i + 1;
      return h('li', { class: k === S.step ? 'on' : (k < S.step ? 'done' : ''), 'aria-current': k === S.step ? 'step' : null }, (k) + ' ' + n);
    }));
  }

  function errBox() { return ui.error ? h('div', { class: 'hc-err', role: 'alert' }, ui.error) : null; }

  function passBox() {
    if (!cfg.passcode) { return null; }
    return h('div', { class: 'hc-field' },
      h('label', { for: 'hc-pass' }, 'Passcode'),
      h('input', { id: 'hc-pass', type: 'password', autocomplete: 'off', value: pass(), oninput: function (e) { try { sessionStorage.setItem('hc_pass', e.target.value); } catch (x) { /* optional */ } } })
    );
  }

  function viewEvent() {
    return h('div', { class: 'hc-view' },
      h('div', {}, h('h2', {}, 'Start with the event'), h('p', { class: 'hc-muted', style: 'margin-top:8px' },
        'Paste the link to a hackathon page. Hack Coach reads the theme, sponsors and judges, researches the judges from public pages, asks your team a few questions, then builds a brief. It coaches you toward ideas a single AI prompt could not produce.')),
      passBox(),
      h('div', { class: 'hc-field' },
        h('label', { for: 'hc-url' }, 'Event link'),
        h('input', { id: 'hc-url', type: 'url', placeholder: 'https://luma.com/...', value: S.url, oninput: function (e) { S.url = e.target.value; save(); } })
      ),
      h('details', {},
        h('summary', {}, 'The page will not load? Paste its text instead'),
        h('div', { class: 'hc-field' },
          h('label', { for: 'hc-text' }, 'Event page text'),
          h('textarea', { id: 'hc-text', rows: 6, placeholder: 'Open the event page, select everything, copy, and paste here.', value: S.text, oninput: function (e) { S.text = e.target.value; save(); } })
        )
      ),
      errBox(),
      ui.busy ? busy('Reading the event. This takes about 10 to 20 seconds.') : h('div', { class: 'hc-row' },
        h('button', { class: 'hc-btn', type: 'button', onclick: readEvent }, 'Read event'),
        h('button', { class: 'hc-btn ghost', type: 'button', onclick: loadSample }, 'Try a sample event')
      )
    );
  }

  function eventCard() {
    var e = S.event;
    var defs = [];
    function d(t, v) { if (v && (!Array.isArray(v) || v.length)) { defs.push(h('dt', {}, t), h('dd', {}, v)); } }
    d('When', e.date); d('Where', e.location); d('Run by', e.organizer); d('Theme', e.theme);
    d('Build time', e.build_window); d('Team size', e.team_size);
    if (arr(e.criteria).length) { d('Judged on', h('ul', {}, e.criteria.map(function (c) { return h('li', {}, c); }))); }
    else { d('Judged on', h('span', { class: 'hc-muted' }, 'No criteria stated on the page.')); }
    if (arr(e.prizes).length) { d('Prizes', e.prizes.join('; ')); }
    if (arr(e.sponsors).length) { d('Sponsors', h('ul', {}, e.sponsors.map(function (s) { return h('li', {}, s.name + (s.what ? ': ' + s.what : '')); }))); }
    if (arr(e.stack).length) { d('Provided stack', h('ul', {}, e.stack.map(function (s) { return h('li', {}, s.name + (s.what ? ': ' + s.what : '')); }))); }
    return h('div', { class: 'hc-card' },
      h('div', { class: 'hc-row' }, h('h3', {}, e.name), S.sample ? pill('info', 'Sample') : null),
      e.summary ? h('p', { class: 'hc-muted' }, e.summary) : null,
      h('dl', { class: 'hc-defs' }, defs));
  }

  function judgeCard(j, i) {
    var r = j.result;
    var head = h('div', { class: 'hc-jedit' },
      h('div', { class: 'hc-field' }, h('label', { for: 'jn' + i }, 'Name'),
        h('input', { id: 'jn' + i, type: 'text', value: j.name, oninput: function (e) { j.name = e.target.value; j.status = j.status === 'done' ? 'idle' : j.status; save(); } })),
      h('div', { class: 'hc-field' }, h('label', { for: 'jt' + i }, 'Title'),
        h('input', { id: 'jt' + i, type: 'text', value: j.title, oninput: function (e) { j.title = e.target.value; save(); } })),
      h('div', { class: 'hc-field' }, h('label', { for: 'jc' + i }, 'Company'),
        h('input', { id: 'jc' + i, type: 'text', value: j.company, oninput: function (e) { j.company = e.target.value; save(); } }))
    );
    var links = h('details', {},
      h('summary', {}, 'Add profile links (optional, more reliable than search)'),
      h('div', { class: 'hc-field' }, h('label', { for: 'jl' + i }, 'One link per line, up to 3'),
        h('textarea', { id: 'jl' + i, rows: 3, value: (j.links || []).join('\n'), oninput: function (e) {
          j.links = e.target.value.split(/\s+/).filter(function (x) { return /^https?:\/\//i.test(x); }).slice(0, 3); save();
        } })));

    var body = null;
    if (j.status === 'loading') { body = busy('Searching public pages for ' + (j.name || 'this judge') + '...'); }
    else if (j.status === 'error') { body = h('div', { class: 'hc-err' }, j.error); }
    else if (j.status === 'done' && r) {
      var kind = r.match === 'good' ? 'ok' : (r.match === 'thin' ? 'warn' : 'bad');
      var text = r.match === 'good' ? 'Good public record' : (r.match === 'thin' ? 'Thin public record' : 'Nothing reliable found');
      body = h('div', { class: 'hc-view', style: 'gap:12px' },
        h('div', { class: 'hc-row' }, pill(kind, text),
          h('label', { class: 'hc-small' }, h('input', { type: 'checkbox', checked: j.confirmed ? true : null, onchange: function (e) { j.confirmed = e.target.checked; save(); } }), ' This is the right person')),
        r.identity_note ? h('p', { class: 'hc-small hc-muted' }, r.identity_note) : null,
        r.role_summary ? h('p', {}, r.role_summary) : null,
        arr(r.findings).length ? h('ul', {}, r.findings.map(function (f) { return h('li', {}, f.text + ' ', link(f.source_url, 'source')); })) : null,
        arr(r.likely_cares).length ? h('div', {}, label('Inference, not fact'),
          h('ul', {}, r.likely_cares.map(function (c) { return h('li', {}, c.text + (c.basis ? ' (' + c.basis + ')' : '')); }))) : null,
        arr(r.resources).length ? h('div', {}, label('Their own resources you could use'),
          h('ul', {}, r.resources.map(function (x) { return h('li', {}, link(x.url, x.name), x.why ? ': ' + x.why : ''); }))) : null,
        h('div', {}, h('button', { class: 'hc-btn ghost small', type: 'button', onclick: function () { j.refresh = true; research(j); render(); } }, 'Search again'))
      );
    }

    return h('div', { class: 'hc-card' }, head, links, body,
      h('div', {}, h('button', { class: 'hc-btn ghost small', type: 'button', onclick: function () { S.judges.splice(i, 1); save(); render(); } }, 'Remove judge')));
  }

  function viewJudges() {
    var pending = S.judges.some(function (j) { return j.status === 'loading'; });
    var anyIdle = S.judges.some(function (j) { return j.name && j.status !== 'done' && j.status !== 'loading'; });
    return h('div', { class: 'hc-view' },
      h('div', {}, h('h2', {}, 'The event and its judges'), h('p', { class: 'hc-muted', style: 'margin-top:8px' },
        'Check what was read. Research uses public pages only, and every claim links to its source. Names can match the wrong person, so confirm each one.')),
      eventCard(),
      h('h3', {}, 'Judges'),
      S.judges.length ? null : h('p', { class: 'hc-muted' }, 'No judges were found on the page. Add them below, or skip this step.'),
      h('div', { class: 'hc-cards' }, S.judges.map(judgeCard)),
      h('div', { class: 'hc-row' },
        h('button', { class: 'hc-btn ghost', type: 'button', onclick: function () { S.judges.push({ name: '', title: '', company: '', links: [], status: 'idle', confirmed: true }); save(); render(); } }, 'Add a judge'),
        anyIdle ? h('button', { class: 'hc-btn', type: 'button', disabled: pending ? true : null, onclick: researchAll }, 'Research judges') : null,
        h('button', { class: 'hc-btn' + (anyIdle ? ' ghost' : ''), type: 'button', onclick: function () { go(3); } }, anyIdle ? 'Skip judge research' : 'Next: your team')
      ),
      h('div', {}, h('button', { class: 'hc-btn ghost small', type: 'button', onclick: function () { go(1); } }, 'Back'))
    );
  }

  var QUESTIONS = [
    { k: 'skills', t: 'What can your team build well?', p: 'Languages, frameworks, ML, hardware, design.' },
    { k: 'interests', t: 'What do you actually care about?', p: 'A problem you have lived, a field you love. This should beat any judge preference.' },
    { k: 'people', t: 'Who could you talk to or get real input from before demo day?', p: 'A person with a real problem, a mentor, someone in the room.' },
    { k: 'hardware', t: 'What physical things or devices do you have?', p: 'Cameras, a phone, sensors, a Raspberry Pi, a robot, anything.' },
    { k: 'avoid', t: 'What have you seen before or do not want to build?', p: 'Optional. Chatbots, study planners, and so on.' }
  ];

  function viewTeam() {
    var fields = QUESTIONS.map(function (q) {
      return h('div', { class: 'hc-field' },
        h('label', { for: 'q-' + q.k }, q.t),
        h('textarea', { id: 'q-' + q.k, rows: 3, placeholder: q.p, value: S.answers[q.k] || '', oninput: function (e) { S.answers[q.k] = e.target.value; save(); } }));
    });
    var nums = h('div', { class: 'hc-grid' },
      h('div', { class: 'hc-field' }, h('label', { for: 'q-hours' }, 'Hours you have to build'),
        h('input', { id: 'q-hours', type: 'number', min: 1, max: 72, value: S.answers.hours || '', oninput: function (e) { S.answers.hours = e.target.value; save(); } })),
      h('div', { class: 'hc-field' }, h('label', { for: 'q-team' }, 'Team size'),
        h('input', { id: 'q-team', type: 'number', min: 1, max: 10, value: S.answers.team || '', oninput: function (e) { S.answers.team = e.target.value; save(); } })));
    return h('div', { class: 'hc-view' },
      h('div', {}, h('h2', {}, 'Tell the coach about your team'), h('p', { class: 'hc-muted', style: 'margin-top:8px' },
        'The more specific you are, the less generic the ideas. Directions are built from your skills, your people and your hardware.')),
      nums, fields, errBox(),
      ui.busy ? busy('Building your brief. This takes 20 to 60 seconds.') : h('div', { class: 'hc-row' },
        h('button', { class: 'hc-btn', type: 'button', onclick: buildBrief }, 'Build my brief'),
        h('button', { class: 'hc-btn ghost', type: 'button', onclick: function () { go(2); } }, 'Back'))
    );
  }

  function scorePill(s) {
    if (s === 'low') { return pill('ok', 'Hard for AI alone'); }
    if (s === 'high') { return pill('bad', 'AI could do this alone'); }
    return pill('warn', 'Partly AI-doable');
  }

  function directionCard(d, i, o) {
    var rec = i === o.recommended;
    var he = d.human_element || {}, ai = d.ai_alone || {};
    var defs = [];
    function row(t, v) { if (v && (!Array.isArray(v) || v.length)) { defs.push(h('dt', {}, t), h('dd', {}, v)); } }
    row('What it does', d.what_it_does);
    row('Human element', (he.type ? he.type + ': ' : '') + str(he.detail));
    row('AI-alone test', h('span', {}, ai.reason));
    row('Uses', arr(d.stack_use).join(', '));
    row('Time', d.time_fit);
    row('Risk', d.risk);
    row('Passion check', d.passion_check);
    return h('div', { class: 'hc-card' + (rec ? ' rec' : '') },
      h('div', { class: 'hc-row' }, rec ? pill('info', 'Recommended') : null, scorePill(ai.score)),
      h('h3', {}, d.title),
      d.pitch ? h('p', {}, d.pitch) : null,
      h('dl', { class: 'hc-defs' }, defs),
      arr(d.judge_fit).length ? h('div', {}, label('Judge fit'), h('ul', {}, d.judge_fit.map(function (f) {
        return h('li', {}, h('strong', {}, f.judge + ': '), f.why + ' ', f.source_url ? link(f.source_url, 'source') : null);
      }))) : null,
      arr(d.resources).length ? h('div', {}, label('Resources to use'), h('ul', {}, d.resources.map(function (r) {
        return h('li', {}, r.url ? link(r.url, r.name) : r.name, r.why ? ': ' + r.why : '');
      }))) : null
    );
  }

  function listBlock(title, items, mapFn) {
    if (!arr(items).length) { return null; }
    return h('div', { class: 'hc-view', style: 'gap:10px' }, h('h3', {}, title), mapFn(items));
  }

  function viewBrief() {
    var o = S.out;
    if (!o) { return h('div', { class: 'hc-view' }, h('p', {}, 'No brief yet.'), h('button', { class: 'hc-btn', type: 'button', onclick: function () { go(3); } }, 'Back to your team')); }
    var copyBtn = h('button', { class: 'hc-btn small', type: 'button', onclick: function () { copyBrief(copyBtn); } }, 'Copy brief');
    return h('div', { class: 'hc-view' },
      h('div', { class: 'hc-row' }, h('h2', {}, 'Your brief'), S.sample ? pill('info', 'Sample judges') : null),
      h('p', {}, o.read),
      h('div', { class: 'hc-cards' }, arr(o.directions).map(function (d, i) { return directionCard(d, i, o); })),
      o.recommended_reason ? h('p', {}, h('strong', {}, 'Why the recommended one: '), o.recommended_reason) : null,
      arr(o.warnings).length ? h('div', { class: 'hc-card' }, label('Watch out'), h('ul', {}, o.warnings.map(function (w) { return h('li', {}, w); }))) : null,
      listBlock('Plan', o.plan, function (items) {
        return h('ul', { class: 'hc-timeline' }, items.map(function (p) { return h('li', {}, h('span', { class: 't' }, p.when), h('span', {}, p.task)); }));
      }),
      listBlock('Pitch beats', o.pitch, function (items) {
        return h('ul', { class: 'hc-timeline' }, items.map(function (p) { return h('li', {}, h('span', { class: 't' }, p.beat), h('span', {}, p.line)); }));
      }),
      listBlock('Questions a judge could ask', o.challenge_questions, function (items) { return h('ul', {}, items.map(function (q) { return h('li', {}, q); })); }),
      listBlock('Ask the room early', o.ask_the_room, function (items) { return h('ul', {}, items.map(function (q) { return h('li', {}, q); })); }),
      h('p', { class: 'hc-small hc-muted' }, 'Judge notes come from public pages and are not statements by the judges. Lines marked inference are guesses. Build for a problem you care about first.'),
      h('div', { class: 'hc-row' }, copyBtn,
        h('button', { class: 'hc-btn ghost small', type: 'button', onclick: downloadBrief }, 'Download .md'),
        h('button', { class: 'hc-btn ghost small', type: 'button', onclick: function () { go(3); } }, 'Change answers'),
        h('button', { class: 'hc-btn ghost small', type: 'button', onclick: function () { S = fresh(); save(); render(); } }, 'Start over'))
    );
  }

  function render() {
    root.textContent = '';
    if (S.step > 1 && !S.event) { S.step = 1; }
    var view = S.step === 2 ? viewJudges() : (S.step === 3 ? viewTeam() : (S.step === 4 ? viewBrief() : viewEvent()));
    root.appendChild(stepper());
    root.appendChild(view);
  }

  render();
})();
