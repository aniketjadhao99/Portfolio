import os

def format_java_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    formatted_lines = []
    indent_level = 0
    indent_size = 4

    for line in lines:
        stripped_line = line.strip()
        
        if not stripped_line:
            formatted_lines.append('\n')
            continue

        # Adjust indent level before the line if it starts with }
        if stripped_line.startswith('}'):
            indent_level = max(0, indent_level - 1)
        elif stripped_line.startswith('</'): # For HTML tags
            indent_level = max(0, indent_level - 1)

        # Build the indented line
        # Logic to skip headers
        is_header = any(stripped_line.startswith(h) for h in ["Slip", "Database", "Java file", "Html file", "Jsp file", "The Bean Class", "The Configuration File", "The Main Class", "Steps to run"])
        
        if is_header:
            formatted_lines.append(stripped_line + '\n')
            indent_level = 0 # Reset indent for new sections
            continue

        indent = ' ' * (indent_level * indent_size)
        formatted_lines.append(f"{indent}{stripped_line}\n")

        # Adjust indent level after the line
        if stripped_line.endswith('{') or stripped_line.endswith('<form') or stripped_line.endswith('<body>') or stripped_line.endswith('<html>'):
            indent_level += 1
        
        # Count braces for complex lines
        open_b = stripped_line.count('{')
        close_b = stripped_line.count('}')
        if not (stripped_line.startswith('}') and close_b == 1 and open_b == 0): # handled above
             indent_level += (open_b - close_b)
        
        indent_level = max(0, indent_level)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(formatted_lines)

if __name__ == "__main__":
    format_java_file(r"c:\Users\ANIKET\OneDrive\Desktop\Portfolio\public\Java Slips Solutions.txt")
