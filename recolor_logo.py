from PIL import Image
import sys

def recolor_navy_to_white(input_path, output_path):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    datas = img.getdata()

    new_data = []
    for item in datas:
        # Check for dark navy color (approximate)
        # The 'Pasif' text is dark. 'flow' is bright cyan.
        # We want to change dark pixels to White (255, 255, 255)
        # Keeping Alpha channel intact if possible, or assuming solid text on transparent bg.
        
        r, g, b, a = item
        
        # Transparent pixels stay transparent
        if a == 0:
            new_data.append(item)
            continue
            
        # Heuristic for the dark navy color of "Pasif"
        # It is likely low R, low G, low-ish B.
        # Cyan is high G, high B.
        
        # If it's dark (Navy), make it White
        if r < 100 and g < 100 and b < 150:
            new_data.append((255, 255, 255, a))
        else:
            # Leave Cyan / other colors alone
            new_data.append(item)

    img.putdata(new_data)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python recolor_logo.py <input> <output>")
    else:
        recolor_navy_to_white(sys.argv[1], sys.argv[2])
