import re
import os

txt_path = r"c:\Users\ANIKET\OneDrive\Desktop\Portfolio\public\Java Slips Solutions.txt"
html_path = r"c:\Users\ANIKET\OneDrive\Desktop\Portfolio\public\vitthal_photos.html"

with open(txt_path, 'r', encoding='utf-8') as f:
    text = f.read()

# Normalize line endings
text = text.replace('\r\n', '\n')

# Split by "Slip X"
slips_raw = re.split(r'\nSlip\s+(\d+)\n', '\n' + text)

slips_data = []
for i in range(1, len(slips_raw), 2):
    slip_num = slips_raw[i]
    slip_content = slips_raw[i+1]
    slips_data.append((slip_num, slip_content))

def format_slip_html(num, content):
    # Expanded headers list
    header_variants = [
        "Database", "Java file", "Java File", "Html file", "Html File", "HTML file", "HTML File", 
        "Jsp file", "Jsp File", "JSP file", "JSP File", "The Bean Class", "The Configuration File", 
        "The Main Class", "Steps to run", "Login.html", "Slip24.jsp", "Login.jsp", "Welcome.jsp",
        "index.html"
    ]
    
    html = []
    html.append(f'<div class="slip" id="s{int(num)}">')
    html.append(f'  <div class="slip-header"><span class="slip-num">SLIP {int(num):02d}</span><span class="slip-title">Java Solutions</span></div>')
    html.append(f'  <div class="slip-body">')

    # Detect sections
    pattern = '|'.join([re.escape(h) for h in header_variants])
    
    # We'll use split with capture to keep the headers
    parts = re.split(rf'\n?({pattern})\n?', content)
    
    q_count = 1
    
    first_part = parts[0].strip()
    if first_part:
        # Check if first part contains OR
        if "OR" in first_part:
             sub_parts = re.split(r'\nOR\n', first_part)
             html.append(f'<div class="q-label">Question {q_count}</div>')
             q_count += 1
             html.append(f'<pre>{escape(sub_parts[0].strip())}</pre>')
             for sp in sub_parts[1:]:
                 html.append(f'<div class="file-label">OR</div>')
                 html.append(f'<pre>{escape(sp.strip())}</pre>')
        else:
            html.append(f'<div class="q-label">Question {q_count}</div>')
            q_count += 1
            html.append(f'<pre>{escape(first_part)}</pre>')

    for i in range(1, len(parts), 2):
        header = parts[i]
        code = parts[i+1].strip()
        if not code: continue

        html.append(f'<div class="file-label">{header}</div>')
        
        # Check for OR inside this code section too
        if "OR" in code:
            sub_parts = re.split(r'\nOR\n', code)
            html.append(f'<pre>{escape(sub_parts[0].strip())}</pre>')
            for sp in sub_parts[1:]:
                html.append(f'<div class="file-label">OR</div>')
                html.append(f'<pre>{escape(sp.strip())}</pre>')
        else:
            html.append(f'<pre>{escape(code)}</pre>')

    html.append('  </div>')
    html.append('</div>')
    return '\n'.join(html)

def escape(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;').replace("'", '&#x27;')

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

print("Done updating HTML with improved parsing")
