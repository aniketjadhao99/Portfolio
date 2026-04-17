import re
import os

txt_path = r"c:\Users\ANIKET\OneDrive\Desktop\Portfolio\public\Java Slips Solutions.txt"
html_path = r"c:\Users\ANIKET\OneDrive\Desktop\Portfolio\public\vitthal_photos.html"

# Common Java headers to separate files/questions
HEADER_VARIANTS = [
    "Database", "Java file", "Java File", "Html file", "Html File", "HTML file", "HTML File", 
    "Jsp file", "Jsp File", "JSP file", "JSP File", "The Bean Class", "The Configuration File", 
    "The Main Class", "Steps to run", "Login.html", "Slip24.jsp", "Login.jsp", "Welcome.jsp",
    "index.html", "Patient.html", "patient.jsp", "Result.jsp", "Login.php", "Register.jsp"
]

def escape(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;').replace("'", '&#x27;')

def clean_code(code):
    # Fix fancy quotes
    code = code.replace('“', '"').replace('”', '"').replace('‘', "'").replace('’', "'")
    
    # Fix some common typos like out.println(...) without semicolon in JSP/Java
    # This regex is a bit risky but we'll try to be specific
    code = re.sub(r'(out\.println\s*\([^)]+\))(?!\s*;)', r'\1;', code)
    
    return code

def split_into_questions(block_content):
    """
    Splits a block of code into multiple questions if it contains distinct programs.
    Returns a list of (label, code) tuples.
    """
    # Look for patterns that indicate a new program:
    # 1. An import statement that follows some code (not at the very top)
    # 2. A 'class' or 'public class' that follows a '}' 
    
    # We'll split where we see an import or class preceded by at least one closing brace
    # or significant whitespace after some code.
    
    # Use a more robust split: look for 'import' or 'class' at the start of a line
    # after some other code has already happened.
    
    segments = re.split(rf'(?m)^(?=import\s|class\s|public\s+class\s)', block_content)
    
    results = []
    current_q = []
    
    for seg in segments:
        seg_trimmed = seg.strip()
        if not seg_trimmed: continue
        
        # If current_q has something and this segment starts with import or high-level class,
        # it might be a new program.
        if current_q and (seg_trimmed.startswith('import ') or seg_trimmed.startswith('class ') or seg_trimmed.startswith('public class ')):
            # If the previous segment ended with a '}' or looks like a full program, start new.
            prev = "\n".join(current_q).strip()
            if '}' in prev or ';' in prev:
                 results.append("\n".join(current_q))
                 current_q = [seg]
                 continue
        
        current_q.append(seg)
        
    if current_q:
        results.append("\n".join(current_q))
        
    return results

def process_slip(num, content):
    content = clean_code(content)
    
    # Pre-processing for specific slips
    if num == "5":
        if 'public static void main' not in content:
             content = content.replace('class s5_1\n{', 'class s5_1\n{\n    public static void main(String args[])\n    {')
             # Note: Need internal brace fix too if we do this.

    # Split by explicit headers
    pattern = '|'.join([re.escape(h) for h in HEADER_VARIANTS])
    # Protect headers that are on their own lines
    parts = re.split(rf'(?m)^({pattern})$', content)
    
    blocks = [] # List of (header, content)
    
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
                    # Apply implicit split to the part before OR
                    qs = split_into_questions(sp)
                    for q in qs:
                        if h.startswith("Question"):
                            final_items.append((f"Question {q_count}", q.strip()))
                            q_count += 1
                        else:
                            final_items.append((h, q.strip()))
        else:
            # Check for multiple programs in this block
            qs = split_into_questions(c)
            if len(qs) > 1:
                for q in qs:
                    if h.startswith("Question") or h in ["Java file", "Java File"]:
                         final_items.append((f"Question {q_count}", q.strip()))
                         q_count += 1
                    else:
                         final_items.append((h, q.strip()))
            else:
                if h.startswith("Question"):
                     final_items.append((f"Question {q_count}", c.strip()))
                     q_count += 1
                else:
                     final_items.append((h, c.strip()))

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
    
    print("Updated HTML with v5 parsing (implicit Q-Splitting and typo fixes)")

if __name__ == "__main__":
    main()
