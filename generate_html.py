#!/usr/bin/env python3
import re

# Read the txt file
with open('public/Java Slips Solutions.txt', 'r', encoding='utf-8') as f:
    content = f.read()

# HTML header
html_header = '''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Advanced Java Slips Solutions</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Syne:wght@400;600;800&display=swap');
  :root {
    --bg: #0d0f1a; --surface: #141726; --border: #252a45; --accent: #4f8ef7;
    --accent2: #f7c948; --accent3: #5ef08a; --text: #dde3f5; --muted: #7a84a8; --code-bg: #0a0c16;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: var(--bg); color: var(--text); font-family: 'Syne', sans-serif; line-height: 1.7; }
  header { background: linear-gradient(135deg, #1a1f3a 0%, #0d0f1a 60%); border-bottom: 2px solid var(--accent); padding: 2.5rem 2rem 2rem; text-align: center; }
  header h1 { font-size: clamp(1.4rem,3vw,2.2rem); font-weight: 800; color: var(--accent); letter-spacing: -0.5px; }
  header p { color: var(--muted); margin-top: .4rem; font-size: .95rem; }
  .toc { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; margin: 2rem auto; max-width: 900px; padding: 1.5rem 2rem; }
  .toc h2 { color: var(--accent2); margin-bottom: 1rem; font-size: 1.1rem; }
  .toc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px,1fr)); gap: .5rem; }
  .toc-grid a { background: #1c2038; border: 1px solid var(--border); border-radius: 6px; color: var(--accent); padding: .4rem .8rem; font-size: .85rem; text-decoration: none; transition: background .2s; font-family: 'JetBrains Mono', monospace; }
  .toc-grid a:hover { background: #252a4a; }
  main { max-width: 960px; margin: 0 auto; padding: 1rem 1.5rem 4rem; }
  .slip { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; margin-bottom: 2.5rem; overflow: hidden; }
  .slip-header { background: linear-gradient(90deg, #1c2240 0%, #141726 100%); border-bottom: 1px solid var(--border); padding: 1rem 1.5rem; display: flex; align-items: center; gap: 1rem; }
  .slip-num { background: var(--accent); color: #fff; font-family: 'JetBrains Mono', monospace; font-size: .8rem; font-weight: 700; padding: .3rem .7rem; border-radius: 6px; white-space: nowrap; }
  .slip-title { font-weight: 600; font-size: 1rem; color: var(--text); }
  .slip-body { padding: 1.2rem 1.5rem; }
  .q-label { color: var(--accent2); font-size: .78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: .3rem; margin-top: 1.2rem; }
  .q-label:first-child { margin-top: 0; }
  .file-label { font-family: 'JetBrains Mono', monospace; font-size: .72rem; color: var(--accent3); background: #071a10; border: 1px solid #1f4a2a; padding: .2rem .6rem; border-radius: 4px; display: inline-block; margin-bottom: .4rem; }
  pre { background: var(--code-bg); border: 1px solid var(--border); border-radius: 8px; padding: 1rem 1.2rem; overflow-x: auto; font-family: 'JetBrains Mono', monospace; font-size: .78rem; line-height: 1.6; color: #c8d6f8; margin-bottom: .5rem; white-space: pre-wrap; }
</style>
</head>
<body>
<header>
  <h1>Advanced Java Programming</h1>
  <p>T.Y.B.Sc. (CS) Sem-VI Solutions | All 30 Slip Practical Answers</p>
</header>
<div class="toc">
  <h2>📋 Quick Navigation</h2>
  <div class="toc-grid"><a href="#s1">Slip 1</a><a href="#s2">Slip 2</a><a href="#s3">Slip 3</a><a href="#s4">Slip 4</a><a href="#s5">Slip 5</a><a href="#s6">Slip 6</a><a href="#s7">Slip 7</a><a href="#s8">Slip 8</a><a href="#s9">Slip 9</a><a href="#s10">Slip 10</a><a href="#s11">Slip 11</a><a href="#s12">Slip 12</a><a href="#s13">Slip 13</a><a href="#s14">Slip 14</a><a href="#s15">Slip 15</a><a href="#s16">Slip 16</a><a href="#s17">Slip 17</a><a href="#s18">Slip 18</a><a href="#s19">Slip 19</a><a href="#s20">Slip 20</a><a href="#s21">Slip 21</a><a href="#s22">Slip 22</a><a href="#s23">Slip 23</a><a href="#s24">Slip 24</a><a href="#s25">Slip 25</a><a href="#s26">Slip 26</a><a href="#s27">Slip 27</a><a href="#s28">Slip 28</a><a href="#s29">Slip 29</a><a href="#s30">Slip 30</a></div></div><main>
'''

html_footer = '''</main>
</body>
</html>
'''

def escape_html(text):
    """Escape HTML special characters"""
    return (text
        .replace('&', '&amp;')
        .replace('<', '&lt;')
        .replace('>', '&gt;')
        .replace('"', '&quot;')
        .replace("'", '&#x27;'))

# Parse slips from content
slip_pattern = r'Slip (\d+)'
slips = re.split(slip_pattern, content)

html_slips = []

for i in range(1, len(slips), 2):
    slip_num = int(slips[i])
    slip_content = slips[i + 1] if i + 1 < len(slips) else ""
    
    # Extract questions
    questions = re.split(r'\d+\.\s+', slip_content)
    questions = [q.strip() for q in questions if q.strip()]
    
    slip_html = f'''<div class="slip" id="s{slip_num}">
  <div class="slip-header"><span class="slip-num">SLIP {slip_num:02d}</span><span class="slip-title">Java Solutions</span></div>
  <div class="slip-body">'''
    
    for idx, question in enumerate(questions, 1):
        slip_html += f'<div class="q-label">Question {idx}</div>'
        
        # Extract code blocks
        code_lines = []
        in_code = False
        for line in question.split('\n'):
            if line.strip() and (line.startswith('import ') or line.startswith('class ') or 
                                line.startswith('public ') or line.startswith('<%') or
                                in_code or line.strip().startswith('{')):
                in_code = True
                code_lines.append(line)
            elif in_code and line.strip() == '':
                continue
            elif in_code and not line.strip():
                break
            elif in_code:
                code_lines.append(line)
        
        if code_lines:
            code = '\n'.join(code_lines[:200])  # Limit to 200 lines
            code = escape_html(code)
            slip_html += f'<pre>{code}</pre>'
        else:
            desc = question[:300]
            slip_html += f'<p>{escape_html(desc)}</p>'
    
    slip_html += '</div></div>'
    html_slips.append(slip_html)

# Combine all
final_html = html_header + '\n'.join(html_slips) + html_footer

# Write to file
with open('public/vitthal_photos.html', 'w', encoding='utf-8') as f:
    f.write(final_html)

print("✅ HTML file generated successfully!")
print(f"Total slips processed: {len(html_slips)}")
