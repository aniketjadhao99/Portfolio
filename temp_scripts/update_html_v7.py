import re
import os

txt_path = r"c:\Users\ANIKET\OneDrive\Desktop\Portfolio\public\Java Slips Solutions.txt"
html_path = r"c:\Users\ANIKET\OneDrive\Desktop\Portfolio\public\vitthal_photos.html"

HEADER_VARIANTS = [
    "Database", "Java file", "Java File", "Html file", "Html File", "HTML file", "HTML File", 
    "Jsp file", "Jsp File", "JSP file", "JSP File", "The Bean Class", "The Configuration File", 
    "The Main Class", "Steps to run", "Login.html", "Slip24.jsp", "Login.jsp", "Welcome.jsp",
    "index.html", "Patient.html", "patient.jsp", "Result.jsp", "Login.php", "Register.jsp", "Login.html", "Result.jsp"
]

def escape(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;').replace("'", '&#x27;')

def clean_code(code):
    # Fix fancy quotes and common typos
    code = code.replace('“', '"').replace('”', '"').replace('‘', "'").replace('’', "'")
    code = code.replace('”', '"') # Double check
    
    # Fix specific connection string typos found in slips
    code = code.replace(',"postgres"," "', ',"postgres"," "') # normalize
    code = code.replace('postgres”, “ ”', 'postgres", " "')
    
    return code

def split_into_questions(block_content):
    block_content = block_content.strip()
    if not block_content: return []
    
    # Find indices of potential program starts (import or class at start of line)
    starts = [m.start() for m in re.finditer(rf'(?m)^(import\s|class\s|public\s+class\s|@WebServlet)', block_content)]
    
    if not starts:
        return [block_content]
    
    results = []
    last_idx = 0
    
    for i in range(1, len(starts)):
        mid_content = block_content[last_idx:starts[i]]
        # If we've seen a class definition (brace) or a decent amount of code, split.
        if '}' in mid_content or ';' in mid_content:
            # But don't split if it's just consecutive imports.
            # Only split if the NEW starting line is an 'import' but there's a '}' before it,
            # OR if the new line is a 'class' and there's a '}' before it.
            results.append(block_content[last_idx:starts[i]].strip())
            last_idx = starts[i]
            
    results.append(block_content[last_idx:].strip())
    return results

def process_slip(num, content):
    content = clean_code(content)
    
    if num == "5":
        if 'public static void main' not in content and 'class s5_1' in content:
             content = content.replace('class s5_1\n{', 'class s5_1\n{\n    public static void main(String args[])\n    {')

    pattern = '|'.join([re.escape(h) for h in HEADER_VARIANTS])
    # Case insensitive header split
    parts = re.split(rf'(?mi)^({pattern})$', content)
    
    blocks = []
    first_block = parts[0].strip()
    if first_block:
        blocks.append(("Question 1", first_block))
    
    for i in range(1, len(parts), 2):
        h = parts[i]
        c = parts[i+1].strip()
        if c:
            blocks.append((h, c))
            
    final_items = []
    q_count = 1
    
    for h, c in blocks:
        # Check for OR
        if "\nOR\n" in c:
            sub_parts = re.split(r'\nOR\n', c)
            for idx, sp in enumerate(sub_parts):
                if idx > 0:
                    final_items.append(("OR", sp.strip()))
                else:
                    qs = split_into_questions(sp)
                    for q in qs:
                        label = f"Question {q_count}" if h.startswith("Question") else h
                        final_items.append((label, q.strip()))
                        if label.startswith("Question"): q_count += 1
        else:
            qs = split_into_questions(c)
            for idx, q in enumerate(qs):
                if len(qs) > 1:
                    label = f"Question {q_count}" if h.startswith("Question") or "Java" in h or "Jsp" in h or "Html" in h else h
                    final_items.append((label, q.strip()))
                    if label.startswith("Question"): q_count += 1
                else:
                    label = f"Question {q_count}" if h.startswith("Question") else h
                    final_items.append((label, q.strip()))
                    if label.startswith("Question"): q_count += 1

    # Build HTML
    html = []
    html.append(f'<div class="slip" id="s{int(num)}">')
    html.append(f'  <div class="slip-header"><span class="slip-num">SLIP {int(num):02d}</span><span class="slip-title">Java Solutions</span></div>')
    html.append(f'  <div class="slip-body">')
    
    current_q_label = 0
    for h, c in final_items:
        if h.startswith("Question"):
            html.append(f'<div class="q-label">{h}</div>')
        elif h == "OR":
            html.append(f'<div class="file-label">OR</div>')
        else:
            html.append(f'<div class="file-label">{h}</div>')
        
        # Simple indentation fix if the code is very messy
        # lines = [line.strip() for line in c.split('\n')]
        # ... logic to indent ...
        
        html.append(f'<pre>{escape(c)}</pre>')
        
    html.append('  </div>')
    html.append('</div>')
    return "\n".join(html)

def main():
    with open(txt_path, 'r', encoding='utf-8') as f:
        text = f.read()
    
    text = text.replace('\r\n', '\n')
    slips_raw = re.split(r'\nSlip\s+(\d+)\b', '\n' + text)
    
    all_slips_html = []
    for i in range(1, len(slips_raw), 2):
        slip_num = slips_raw[i]
        slip_content = slips_raw[i+1]
        all_slips_html.append(process_slip(slip_num, slip_content))
        
    full_html = "\n".join(all_slips_html)
    
    with open(html_path, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    new_html = re.sub(r'<main>.*?</main>', f'<main>\n{full_html}\n</main>', html_content, flags=re.DOTALL)
    
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(new_html)
    
    print("Updated HTML with v7 parsing (Final Splitting and Typo cleanup)")

if __name__ == "__main__":
    main()
