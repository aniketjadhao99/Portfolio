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
    code = code.replace('“', '"').replace('”', '"').replace('‘', "'").replace('’', "'")
    # Fix typos in output statements
    code = re.sub(r'(out\.println\s*\([^)]+\))(?!\s*;)', r'\1;', code)
    # Fix SQL string typos (e.g., from donar” to "donar")
    code = code.replace('”', '"')
    return code

def split_into_questions(block_content):
    """
    Splits code into multiple programs/questions based on import/class blocks.
    """
    # We want to split if we see 'import' or 'class' after a previous class has ended.
    # A simple indicator is a new import block starting after a '}'
    
    # regex to find potential program starts
    # pattern: an import or class at the start of a line, but only if preceded by a significant gap OR a closing brace
    
    # First, let's normalize the block
    block_content = block_content.strip()
    if not block_content: return []
    
    # Heuristic: Find all indices of 'import ', 'public class ', 'class ' at start of lines
    starts = [m.start() for m in re.finditer(rf'(?m)^(import\s|class\s|public\s+class\s)', block_content)]
    
    if not starts:
        return [block_content]
    
    results = []
    last_idx = 0
    
    # We decide to split at starts[i] if the text between starts[i-1] and starts[i] contains a '}'
    # This implies the previous class/program finished.
    
    for i in range(1, len(starts)):
        mid_content = block_content[starts[i-1]:starts[i]]
        if '}' in mid_content:
            # Check if current start is an import or class
            # If it's just another 'import' in the same block, don't split.
            # But if it's the start of a NEW import block...
            # A simple rule: if it follows a '}', it's likely a new program.
            results.append(block_content[last_idx:starts[i]].strip())
            last_idx = starts[i]
            
    results.append(block_content[last_idx:].strip())
    return results

def process_slip(num, content):
    content = clean_code(content)
    
    # Pre-processing for specific slips
    if num == "5":
        if 'public static void main' not in content and 'class s5_1' in content:
             content = content.replace('class s5_1\n{', 'class s5_1\n{\n    public static void main(String args[])\n    {')

    # Split by explicit headers
    pattern = '|'.join([re.escape(h) for h in HEADER_VARIANTS])
    parts = re.split(rf'(?m)^({pattern})$', content)
    
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
            if len(qs) > 1:
                for q in qs:
                    # If the header was "Java file", and we found 2 programs, keep "Java file" for the first and next one gets Q-label or similar?
                    # Actually, if it's a split, it's usually because it's a new question.
                    label = f"Question {q_count}" if h.startswith("Question") or "Java" in h else h
                    final_items.append((label, q.strip()))
                    if label.startswith("Question"): q_count += 1
            else:
                label = f"Question {q_count}" if h.startswith("Question") else h
                final_items.append((label, c.strip()))
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
    
    print("Updated HTML with v6 parsing (Improved Splitting)")

if __name__ == "__main__":
    main()
