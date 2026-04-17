import re
import os

txt_path = r"c:\Users\ANIKET\OneDrive\Desktop\Portfolio\public\Java Slips Solutions.txt"
html_path = r"c:\Users\ANIKET\OneDrive\Desktop\Portfolio\public\vitthal_photos.html"

HEADER_VARIANTS = [
    "Database", "Java file", "Java File", "Html file", "Html File", "HTML file", "HTML File", 
    "Jsp file", "Jsp File", "JSP file", "JSP File", "The Bean Class", "The Configuration File", 
    "The Main Class", "Steps to run", "Login.html", "Slip24.jsp", "Login.jsp", "Welcome.jsp",
    "index.html", "Patient.html", "patient.jsp", "Result.jsp", "Login.php", "Register.jsp"
]

def escape(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;').replace("'", '&#x27;')

def clean_code(code):
    # Fix fancy quotes and connection string typos
    code = code.replace('“', '"').replace('”', '"').replace('‘', "'").replace('’', "'")
    code = code.replace('postgres”, “ ”', 'postgres", ""')
    code = code.replace('postgres", " "', 'postgres", ""')
    # More connection string cleanup
    code = re.sub(r'DriverManager\.getConnection\s*\(([^)]+)\)', 
                  lambda m: m.group(0).replace('”', '"').replace('“', '"'), code)
    return code

def split_into_questions(block_content):
    block_content = block_content.strip()
    if not block_content: return []
    
    # We'll split if we see 'class ' or 'public class ' or '@WebServlet' 
    # but ONLY if we have already seen a '}' in the current program.
    
    # Or, we split if we see a significant gap of empty lines followed by a new import/class
    
    # Let's use a simpler marker: split at 'import', 'class', 'public class' 
    # IF the previous character that wasn't whitespace was a '}'.
    
    lines = block_content.split('\n')
    programs = []
    current_prog = []
    has_closed_class = False
    
    for line in lines:
        stripped = line.strip()
        if not stripped:
            current_prog.append(line)
            continue
            
        # Check if this line starts a new program
        is_start = re.match(r'^(import\s|class\s|public\s+class\s|@WebServlet|package\s|<html>|<!DOCTYPE)', stripped, re.IGNORECASE)
        
        if is_start and has_closed_class:
            programs.append("\n".join(current_prog).strip())
            current_prog = [line]
            has_closed_class = False
        else:
            current_prog.append(line)
            if '}' in stripped:
                # We count braces to be sure? No, just check if it ends with } or has }
                 # For simplicity, if a line has } and we are at 0 indent? 
                 # Let's just assume } marks potential end.
                 has_closed_class = True
                 
    if current_prog:
        programs.append("\n".join(current_prog).strip())
        
    return [p for p in programs if p]

def process_slip(num, content):
    content = clean_code(content)
    
    # Fix Slip 5 specifically
    if num == "5" and 'public static void main' not in content:
        content = content.replace('class s5_1\n{', 'class s5_1\n{\n    public static void main(String args[])\n    {')

    # Split by explicit headers
    pattern = '|'.join([re.escape(h) for h in HEADER_VARIANTS])
    parts = re.split(rf'(?mi)^({pattern})$', content)
    
    blocks = []
    first_block = parts[0].strip()
    if first_block:
        blocks.append(("Content", first_block))
    
    for i in range(1, len(parts), 2):
        blocks.append((parts[i], parts[i+1].strip()))
            
    final_items = []
    q_count = 1
    
    for h, c in blocks:
        if "\nOR\n" in c:
            sub_parts = re.split(r'\nOR\n', c)
            for idx, sp in enumerate(sub_parts):
                if idx > 0:
                    final_items.append(("OR", sp.strip()))
                else:
                    # Within each OR part, check for multiple programs
                    qs = split_into_questions(sp)
                    for q in qs:
                        label = f"Question {q_count}" if h == "Content" else h
                        final_items.append((label, q))
                        if label.startswith("Question"): q_count += 1
        else:
            qs = split_into_questions(c)
            for q in qs:
                label = f"Question {q_count}" if h == "Content" else h
                final_items.append((label, q))
                if label.startswith("Question"): q_count += 1

    # Build HTML
    html = []
    html.append(f'<div class="slip" id="s{int(num)}">')
    html.append(f'  <div class="slip-header"><span class="slip-num">SLIP {int(num):02d}</span><span class="slip-title">Java Solutions</span></div>')
    html.append(f'  <div class="slip-body">')
    
    for h, c in final_items:
        if h.startswith("Question"):
            html.append(f'<div class="q-label">{h}</div>')
        elif h == "OR":
            html.append(f'<div class="file-label">OR</div>')
        else:
            html.append(f'<div class="file-label">{h}</div>')
        
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
    
    print("Updated HTML with v8 parsing (Final Fixes)")

if __name__ == "__main__":
    main()
