import re
import os

txt_path = r"c:\Users\ANIKET\OneDrive\Desktop\Portfolio\public\Java Slips Solutions.txt"
html_path = r"c:\Users\ANIKET\OneDrive\Desktop\Portfolio\public\vitthal_photos.html"

with open(txt_path, 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('\r\n', '\n')

# Split by "Slip X"
slips_raw = re.split(r'\nSlip\s+(\d+)\b', '\n' + text)

slips_data = []
for i in range(1, len(slips_raw), 2):
    slip_num = slips_raw[i]
    slip_content = slips_raw[i+1]
    slips_data.append((slip_num, slip_content))

def format_slip_html(num, content):
    header_variants = [
        "Database", "Java file", "Java File", "Html file", "Html File", "HTML file", "HTML File", 
        "Jsp file", "Jsp File", "JSP file", "JSP File", "The Bean Class", "The Configuration File", 
        "The Main Class", "Steps to run", "Login.html", "Slip24.jsp", "Login.jsp", "Welcome.jsp",
        "index.html", "Patient.html", "patient.jsp"
    ]
    
    html = []
    html.append(f'<div class="slip" id="s{int(num)}">')
    html.append(f'  <div class="slip-header"><span class="slip-num">SLIP {int(num):02d}</span><span class="slip-title">Java Solutions</span></div>')
    html.append(f'  <div class="slip-body">')

    # Detect sections
    # Only split if header is at the start of a line and potentially followed by newline
    pattern = '|'.join([re.escape(h) for h in header_variants])
    
    # Use finditer to get positions of headers that start lines
    matches = list(re.finditer(rf'(?m)^({pattern})$', content))
    
    q_count = 1
    
    if not matches:
        # Just handle Question 1 and OR
        html.extend(process_code_block(content, q_count))
    else:
        # Before first header
        pre_text = content[:matches[0].start()].strip()
        if pre_text:
            html.extend(process_code_block(pre_text, q_count))
            q_count += 1
        
        for i in range(len(matches)):
            header = matches[i].group(1)
            start = matches[i].end()
            end = matches[i+1].start() if i+1 < len(matches) else len(content)
            code = content[start:end].strip()
            
            if code:
                html.append(f'<div class="file-label">{header}</div>')
                html.extend(process_code_block(code, None))

    html.append('  </div>')
    html.append('</div>')
    return '\n'.join(html)

def process_code_block(code, q_num):
    blocks = []
    # Split by OR
    if "\nOR\n" in code:
        parts = re.split(r'\nOR\n', code)
        if q_num:
            blocks.append(f'<div class="q-label">Question {q_num}</div>')
        blocks.append(f'<pre>{escape(parts[0].strip())}</pre>')
        for p in parts[1:]:
            blocks.append(f'<div class="file-label">OR</div>')
            blocks.append(f'<pre>{escape(p.strip())}</pre>')
    else:
        if q_num:
            blocks.append(f'<div class="q-label">Question {q_num}</div>')
        blocks.append(f'<pre>{escape(code.strip())}</pre>')
    return blocks

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

print("Done updating HTML with v3 parsing")
