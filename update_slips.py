#!/usr/bin/env python3
import re
import json

def html_encode(text):
    """Convert special characters to HTML entities for code display"""
    text = text.replace('&', '&amp;')
    text = text.replace('"', '&quot;')
    text = text.replace("'", '&#x27;')
    text = text.replace('<', '&lt;')
    text = text.replace('>', '&gt;')
    return text

def extract_code_from_txt():
    """Extract all slip codes from txt file"""
    with open('public/Java Slips Solutions.txt', 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    slips = {}
    current_slip = None
    current_q = None
    current_code = []
    in_code = False
    
    for i, line in enumerate(lines):
        # Check for new slip
        if re.match(r'^Slip \d+$', line.strip()):
            if current_slip and current_q:
                code_text = '\n'.join(current_code).strip()
                if current_slip not in slips:
                    slips[current_slip] = {}
                slips[current_slip][current_q] = code_text
            
            current_slip = int(line.strip().split()[1])
            current_q = None
            current_code = []
            in_code = False
            continue
        
        # Check for question marker
        q_match = re.match(r'^(\d+)\.\s+', line)
        if q_match and current_slip:
            if current_q:
                code_text = '\n'.join(current_code).strip()
                if current_slip not in slips:
                    slips[current_slip] = {}
                slips[current_slip][current_q] = code_text
            
            current_q = int(q_match.group(1))
            current_code = []
            in_code = False
            continue
        
        # Collect code lines
        if current_q:
            if line.strip() and not in_code:
                # Skip non-code lines (description, [15 M], etc)
                if any(x in line for x in ['[', 'M]', 'Write ', 'Design ', 'Create ', 'Develop ']):
                    continue
                # Start collecting code
                if line.strip().startswith('import ') or line.strip().startswith('<%') or line.strip().startswith('class '):
                    in_code = True
            
            if in_code or (current_code and line.strip()):
                if not any(x in line for x in ['[15 ', '[12 ', '[10 M]']) or line.strip().startswith(('import', '<%', 'class', 'public', 'private', 'void', 'static')):
                    current_code.append(line.rstrip('\n'))
                    in_code = True
    
    # Don't forget the last question
    if current_slip and current_q:
        code_text = '\n'.join(current_code).strip()
        if current_slip not in slips:
            slips[current_slip] = {}
        slips[current_slip][current_q] = code_text
    
    return slips

def update_html(slips):
    """Update HTML file with code for questions that exist"""
    with open('public/vitthal_photos.html', 'r', encoding='utf-8') as f:
        html = f.read()
    
    total_replaced = 0
    
    for slip_num in sorted(slips.keys()):
        for q_num in sorted(slips[slip_num].keys()):
            code = slips[slip_num][q_num]
            if not code:  # Skip empty codes
                continue
            
            encoded_code = html_encode(code)
            
            # Find and replace existing question
            slip_pattern = f'<div class="slip" id="s{slip_num}">.*?<div class="q-label">Question {q_num}</div><pre>(.*?)</pre>'
            
            if re.search(slip_pattern, html, re.DOTALL):
                def replacer(match):
                    return match.group(0).replace(match.group(1), encoded_code)
                
                old_html = html
                html = re.sub(slip_pattern, replacer, html, flags=re.DOTALL)
                if html != old_html:
                    total_replaced += 1
    
    with open('public/vitthal_photos.html', 'w', encoding='utf-8') as f:
        f.write(html)
    
    return total_replaced

if __name__ == '__main__':
    print("Extracting code from txt file...")
    slips = extract_code_from_txt()
    
    print(f"✅ Found {len(slips)} slips")
    for slip_num in sorted(slips.keys()):
        q_nums = sorted(slips[slip_num].keys())
        q_count = len(q_nums)
        print(f"  Slip {slip_num}: Questions {q_count} - {q_nums}")
    
    print("\nUpdating HTML file...")
    replaced = update_html(slips)
    print(f"✅ Updated {replaced} questions in HTML!")
