import re
import os

txt_path = r"c:\Users\ANIKET\OneDrive\Desktop\Portfolio\public\Java Slips Solutions.txt"
html_path = r"c:\Users\ANIKET\OneDrive\Desktop\Portfolio\public\vitthal_photos.html"

with open(txt_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Reconstruct text without line numbers from view_file if needed, but since I am running on the file directly, it's fine.
text = "".join(lines)

# Split by "Slip X"
slips_raw = re.split(r'\nSlip\s+(\d+)', text)

slips_data = []
# slips_raw[0] is everything before Slip 1
for i in range(1, len(slips_raw), 2):
    slip_num = slips_raw[i]
    slip_content = slips_raw[i+1]
    slips_data.append((slip_num, slip_content))

def format_slip_html(num, content):
    headers = ["Database", "Java file", "Html file", "Jsp file", "The Bean Class", "The Configuration File", "The Main Class", "Steps to run"]
    
    html = []
    html.append(f'<div class="slip" id="s{int(num)}">')
    html.append(f'  <div class="slip-header"><span class="slip-num">SLIP {int(num):02d}</span><span class="slip-title">Java Solutions</span></div>')
    html.append(f'  <div class="slip-body">')

    # Detect sections
    pattern = '|'.join([re.escape(h) for h in headers])
    
    matches = list(re.finditer(rf'\b({pattern})\b', content))
    
    sections = []
    if not matches:
        sections.append(("Question 1", content))
    else:
        if matches[0].start() > 0:
            pre_text = content[:matches[0].start()].strip()
            if pre_text:
                sections.append(("Question 1", pre_text))
        
        for i in range(len(matches)):
            header = matches[i].group(1)
            start = matches[i].end()
            end = matches[i+1].start() if i+1 < len(matches) else len(content)
            sections.append((header, content[start:end]))

    processed_sections = []
    q_count = 1
    for h, c in sections:
        c_trimmed = c.strip()
        if not c_trimmed: continue
        
        # Split by OR
        if "OR" in c_trimmed:
            parts = re.split(r'\nOR\n', c_trimmed)
            processed_sections.append((h, parts[0].strip()))
            for p in parts[1:]:
                processed_sections.append(("OR", p.strip()))
        else:
            processed_sections.append((h, c_trimmed))

    for h, c in processed_sections:
        if h == "Question 1":
            html.append(f'<div class="q-label">Question {q_count}</div>')
            q_count += 1
        elif h in headers:
            html.append(f'<div class="file-label">{h}</div>')
        elif h == "OR":
            html.append(f'<div class="file-label">OR</div>')
        
        c_escaped = c.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;').replace("'", '&#x27;')
        html.append(f'<pre>{c_escaped}</pre>')

    html.append('  </div>')
    html.append('</div>')
    return '\n'.join(html)

all_slips_html = []
for num, content in slips_data:
    all_slips_html.append(format_slip_html(num, content))

full_slips_html = '\n'.join(all_slips_html)

with open(html_path, 'r', encoding='utf-8') as f:
    html_content = f.read()

# Replace content inside <main>...</main>
new_html = re.sub(r'<main>.*?</main>', f'<main>\n{full_slips_html}\n</main>', html_content, flags=re.DOTALL)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(new_html)

print("Done updating HTML")
