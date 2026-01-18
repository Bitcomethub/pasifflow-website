from PIL import Image
from collections import Counter
import sys

def get_dominant_colors(image_path, num_colors=5):
    try:
        image = Image.open(image_path)
        image = image.convert('RGB')
        # image = image.resize((100, 100)) # improved resolution
        pixels = list(image.getdata())
        
        filtered_pixels = []
        for r, g, b in pixels:
             # Ignore White/Near White
             if r > 240 and g > 240 and b > 240: continue
             # Ignore Black/Near Black
             if r < 15 and g < 15 and b < 15: continue
             # Ignore Greys (low saturation)
             if abs(r - g) < 20 and abs(r - b) < 20: continue
             
             filtered_pixels.append((r, g, b))

        if not filtered_pixels:
             print("No chromatic colors found (Logo likely pure B&W)")
             return

        counts = Counter(filtered_pixels)
        common = counts.most_common(num_colors)
        
        print(f"Dominant Accents in {image_path}:")
        for color, count in common:
            hex_color = '#{:02x}{:02x}{:02x}'.format(*color)
            print(f"- {hex_color} (RGB: {color})")
            
    except Exception as e:
        print(f"Error: {e}")

get_dominant_colors('/Users/macbook/Desktop/pasifflow/public/logo-new.png')
