import re
import os
import html

def heal_java_line(line):
    # Fix common truncations seen in the file
    if 'DriverManager.getConnection("jdbc:postgresql:' in line and line.strip().endswith(':'):
        return line.replace('"jdbc:postgresql:', '"jdbc:postgresql://localhost/postgres", "postgres", "password");')
    if 'DriverManager.getConnection("jdbc:postgresql:' in line and line.strip().endswith('("jdbc:postgresql:'):
        return line.replace('("jdbc:postgresql:', '("jdbc:postgresql://localhost/postgres", "postgres", "password");')
    return line

def process_file():
    input_path = r'c:/Users/ANIKET/OneDrive/Desktop/Portfolio/public/Cleaned_Java_Slips------.txt'
    output_path = r'c:/Users/ANIKET/OneDrive/Desktop/Portfolio/public/vitthal_photos.html'
    
    with open(input_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split by Slip header
    slips_raw = re.split(r'\bSlip\s+(\d+)\b', content)
    
    slips_data = []
    for i in range(1, len(slips_raw), 2):
        slip_num = slips_raw[i]
        slip_content = slips_raw[i+1]
        slips_data.append((slip_num, slip_content))

    all_html_slips = []
    
    # Major markers for files/sections
    block_headers = [
        'Database', 'Java file', 'Html file', 'Jsp file', 'OR', 
        'The Bean Class', 'The Configuration File', 'The Main Class',
        'Patient.html', 'Patient.jsp', 'Steps to run', 'Login.html', 'Slip24.jsp',
        'Java File', 'HTML file', 'JSP file'
    ]
    
    header_pattern = r'\n\s*(' + '|'.join([re.escape(h) for h in block_headers]) + r')\s*\n'

    for slip_num, content in slips_data:
        # Check for explicit Q1/Q2/Q3 markers
        q_markers = re.findall(r'\b(Q1|Q2|Q3)\b', content)
        
        questions = []
        if q_markers:
            q_parts = re.split(r'\b(Q1|Q2|Q3)\b', content)
            for j in range(1, len(q_parts), 2):
                q_label = q_parts[j]
                q_content = q_parts[j+1].strip()
                questions.append({'label': q_label, 'content': q_content})
        else:
            # Fallback split: Use very large gaps (6+ newlines)
            # This avoids splitting within a single program that might have 2-4 blank lines
            parts = re.split(r'\n(?:[ \t]*\n){5,}', content)
            parts = [p.strip() for p in parts if p.strip()]
            for j, p in enumerate(parts):
                questions.append({'label': f'Q{j+1}', 'content': p})

        # Process blocks for each question
        processed_questions = []
        for q in questions:
            q_content = "\n" + q['content'] + "\n"
            
            blocks = []
            if not re.search(header_pattern, q_content):
                blocks.append({'label': None, 'code': q_content.strip()})
            else:
                raw_blocks = re.split(header_pattern, q_content)
                if raw_blocks[0].strip():
                    blocks.append({'label': None, 'code': raw_blocks[0].strip()})
                
                for k in range(1, len(raw_blocks), 2):
                    h_label = raw_blocks[k]
                    h_code = raw_blocks[k+1].strip()
                    blocks.append({'label': h_label, 'code': h_code})
            
            processed_questions.append({
                'label': q['label'],
                'blocks': blocks
            })

        # Generate HTML
        slip_id = f"s{int(slip_num)}"
        html_out = f'<div class="slip" id="{slip_id}">\n'
        html_out += f'  <div class="slip-header"><span class="slip-num">SLIP {slip_num.zfill(2)}</span><span class="slip-title">Java Solutions</span></div>\n'
        html_out += '  <div class="slip-body">\n'
        
        for q in processed_questions:
            q_num = q['label']
            if q_num.startswith('Q'): q_num = q_num[1:]
            
            html_out += f'    <div class="q-label">Question {q_num}</div>\n'
            for b in q['blocks']:
                if b['label'] == 'OR':
                    html_out += '    <div class="file-label">OR</div>\n'
                elif b['label']:
                    html_out += f'    <div class="file-label">{b["label"]}</div>\n'
                
                healed_lines = [heal_java_line(l) for l in b['code'].split('\n')]
                escaped_code = html.escape('\n'.join(healed_lines))
                html_out += f'    <pre>{escaped_code}</pre>\n'
        
        html_out += '  </div>\n</div>\n'
        all_html_slips.append(html_out)

    complete_main_content = "\n".join(all_html_slips)

    with open(output_path, 'r', encoding='utf-8') as f:
        html_content = f.read()

    new_html = re.sub(r'<main>.*?</main>', f'<main>\n{complete_main_content}\n</main>', html_content, flags=re.DOTALL)

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(new_html)
    
    print(f"Update complete (v12). Processed {len(slips_data)} slips.")

if __name__ == "__main__":
    process_file()
