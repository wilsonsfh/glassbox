# Inspiration notes: humans& anchor (Wilson, 23:12)

Source: `_inspo/huamns&-demo-inspo.MP4` (848x848, 21.6 s). Evidence: AI video analysis at 23:25 (`manus-analyze-video`, saved text below) plus the 2 fps contact sheet `analysis/_inspo/humans-contact-2fps.png` that the lead looked at. The analysis is a model reading of the video, not a measured timing study. The other two videos in the bundle (cognition 93 s, manus2.0 166 s) have NOT been analysed yet; the lottie video was not in the bundle.

## What the video does (3 beats, hard cuts between them)
1. 0-4 s: a painterly classroom (chalkboard, books, an orange persimmon) with a pale-sage ampersand mascot wearing round glasses. It does not fade in. It resolves through a patchy block/mosaic dissolve, like paint settling on a canvas (the contact sheet shows ragged patches of the next picture appearing).
2. 5-13 s: a near-black data screen (about #1E1E1E). A horizontal bar chart. All bars grow from zero with ease-out; every competitor is grey; ONE warm tan/gold bar is the subject. Numbers fade in only after the bars have stopped.
3. 14-21 s: another dark screen. Two lines draw left to right (path drawing, ease-out). End dots and numbers fade in after the line is finished.

Between beats there are instant hard cuts, no wipes, no crossfades. All the motion budget is spent on the reveal itself.

## Rules we can apply without a redesign
1. One warm accent, used only for the subject (the winning card, the booked flight, the active lane). Everything else is neutral.
2. Reveal geometry first, numbers last. Bars and lines finish, then the value fades in (about 150-250 ms later).
3. Ease-out only for reveals: `cubic-bezier(.25,1,.5,1)` (our house curve `cubic-bezier(.23,1,.32,1)` is the same family).
4. Lines draw with `stroke-dasharray` / `stroke-dashoffset`, left to right. Use it for the flight path in Q4 and for the track a request rides in Q5.
5. A friendly illustrated opener may dissolve in through patches (block mask or ragged-edge ink mask), then hard-cut into the working UI. Good for the Q2 celebration and the Q8 opener.
6. Context switches are hard cuts; do not slide whole pages. Keep slides and wipes for objects that carry meaning.
7. Hierarchy by weight and by grey level more than by huge size; text-only tabs with a thin underline for the active one.
8. A mascot that stays recognisable across scenes (the glasses ampersand). For us: the Q5 spirit, the Q2 animals, the Hub logos.

Note on the Hub/Q7 gold standard: those favour large type and hand-drawn plates. The anchor adds a restraint rule (accent economy, hard cuts, value-delayed numbers). Use both, do not replace one with the other.

## Where it lands
| Product | Use |
| --- | --- |
| Q2 Cabo | celebration may start with an ink or block dissolve, then settle; one accent colour for the winner |
| Q4 TRACE | flight line draws on; fares fade in after; hard cut from search to confirm |
| Q5 Terminal Boss | requests ride tracks (draw-on path); output text appears after the train arrives |
| Q8 promo | opener = painted dissolve; scene changes = hard cuts; charts/paths draw on |

Raw analysis text of the first pass: `analysis/_inspo/humans-analysis.md` (the first run returned an empty file; the second run's text is summarised above).

## Q5 train inspiration (Wilson, 23:20; file `_inspo/Train-inspo-for-TerminalBoss-2026-11-25-23-20-54.mp4`, 4 s, 3840x2156)
Seen via contact sheet `analysis/_inspo/train-contact.png` (not a full playback): a painted cumulus sky; a small vintage steam locomotive plus one wooden carriage crossing a slender viaduct above the clouds; a serif headline over the sky ("Notifications on a timetable") with a 3-stop timeline of dots; the train enters from the right, the bridge draws in beneath it, then it settles. Used for: elevated bridge lane, locomotive-plus-cart silhouette, timetable strip of stops, cloud puffs, calm settle (no frantic motion). Lottie video never reached the Mac; not viewed.

## Wilson's rules received 23:25-23:33 (chat outweighs markdown)
- Q3 and Q5 are sibling child servers feeding the Hub; shared spirit-train language; plugins shape graphics (Geo Trail = map-pin spirits + route track, Secret Filter = gate station, Model Socket = engine/depot).
- Every graphic must reflect its own product; no generic or stock images; refinement pass, not a redesign.
- Renames: Q1 Mouthpiece, Q2 Cabo, Q5 Terminal Boss, Q6 Glassbox.
- Keep the raw monitor on :4777; restyle dashboard/public to the Hub design kit via a Sandbox sub-agent, low priority.
- Q8 storyboard draft (Coordinator, `_reference/q5-train/coordinator/Q8-STORYBOARD.md`): voice (Q1) -> terminal MCP (Q5) -> Cabo game + celebration (Q2) -> Architecture Magic (Q7) -> TRACE flight (Q4) -> clouds -> Glassbox (Q6); anchor humans&.
