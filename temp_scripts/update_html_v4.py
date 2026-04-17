import re
import os

txt_path = r"c:\Users\ANIKET\OneDrive\Desktop\Portfolio\public\Java Slips Solutions.txt"
html_path = r"c:\Users\ANIKET\OneDrive\Desktop\Portfolio\public\vitthal_photos.html"

# Common Java headers to separate files/questions
HEADER_VARIANTS = [
    "Database", "Java file", "Java File", "Html file", "Html File", "HTML file", "HTML File", 
    "Jsp file", "Jsp File", "JSP file", "JSP File", "The Bean Class", "The Configuration File", 
    "The Main Class", "Steps to run", "Login.html", "Slip24.jsp", "Login.jsp", "Welcome.jsp",
    "index.html", "Patient.html", "patient.jsp", "Login.html", "Result.jsp"
]

def escape(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;').replace("'", '&#x27;')

def format_java_code(lines):
    """Simple indenter for Java-like code"""
    formatted = []
    indent = 0
    for line in lines:
        line = line.strip()
        if not line:
            formatted.append("")
            continue
        
        # Decrease indent for closing braces
        close_count = line.count('}')
        open_count = line.count('{')
        
        if line.startswith('}'):
            indent -= 1
        
        formatted.append("    " * max(0, indent) + line)
        
        if line.endswith('{') or (open_count > close_count):
            if not line.startswith('}'): # if it was like } else { indent stays same
                 if line.endswith('{'):
                     indent += 1
            else:
                 # line starts with } but ends with {
                 pass # indent already decreased, then increased?
        
        # Re-evaluating indent more robustly
        # start_with_close = line.startswith('}')
        # end_with_open = line.endswith('{')
        # indent += (open_count - close_count)
        # This is tricky without a real parser. I'll stick to a simpler version.
    return "\n".join(formatted)

def process_slip(num, content):
    # Normalize content: remove excessive empty lines and fix some common typos
    content = re.sub(r'\n{3,}', '\n\n', content)
    
    # Fix Slip 5 typo found earlier (System.out inside class but outside method)
    if num == "5":
        content = content.replace('class s5_1\n{\n        System.out.println("City does not exist");', 'class s5_1\n{\n    public static void main(String args[])\n    {\n        System.out.println("City does not exist");')
        # Note: Need to be careful not to break valid code.

    sections = []
    
    # Split by explicit headers at start of line
    pattern = '|'.join([re.escape(h) for h in HEADER_VARIANTS])
    parts = re.split(rf'(?m)^({pattern})$', content)
    
    # Initial sequence: [text, header1, text1, header2, text2, ...]
    blocks = []
    if parts[0].strip():
        blocks.append(("Content", parts[0].strip()))
    
    for i in range(1, len(parts), 2):
        h = parts[i]
        c = parts[i+1].strip()
        if c:
            blocks.append((h, c))
            
    # Now, for each block, check for implicit Q2 (OR or new imports)
    final_blocks = []
    q_index = 1
    
    for h, c in blocks:
        # Split by OR
        sub_parts = re.split(r'\nOR\n', c)
        for idx, sp in enumerate(sub_parts):
            if idx > 0:
                final_blocks.append(("OR", sp.strip()))
            else:
                # Within this part, look for implicit program start
                # A program start is often a block of imports followed by a class
                program_splits = re.split(r'\n(?=import\s+[\w\.]+;|public\s+class\b|class\b)', sp)
                
                if len(program_splits) > 1 and h == "Content":
                    # The first one is Q1 content
                    final_blocks.append((f"Question {q_index}", program_splits[0].strip()))
                    q_index += 1
                    # The rest are subsequent questions
                    for ps in program_splits[1:]:
                        if ps.strip():
                            final_blocks.append((f"Question {q_index}", ps.strip()))
                            q_index += 1
                else:
                    if h == "Content":
                        final_blocks.append((f"Question {q_index}", sp.strip()))
                        q_index += 1
                    else:
                        final_blocks.append((h, sp.strip()))

    # Build HTML
    html = []
    html.append(f'<div class="slip" id="s{int(num)}">')
    html.append(f'  <div class="slip-header"><span class="slip-num">SLIP {int(num):02d}</span><span class="slip-title">Java Solutions</span></div>')
    html.append(f'  <div class="slip-body">')
    
    for h, c in final_blocks:
        if h.startswith("Question"):
            html.append(f'<div class="q-label">{h}</div>')
        elif h == "OR":
            html.append(f'<div class="file-label">OR</div>')
        else:
            html.append(f'<div class="file-label">{h}</div>')
        
        # Optional: Run a secondary format on the code
        # c = format_java_code(c.split('\n'))
        
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
    
    print("Updated HTML with robust splitting and Slip 5 fix.")

if __name__ == "__main__":
    main()
