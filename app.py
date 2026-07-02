import os
import json

FOLDER_PATH = "assets/images/"
OUTPUT_FILE = "imagedata.json"

IMAGE_EXTENSIONS = (".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".tiff")


def get_images_grouped_by_folder(base_path):
    data = {}

    for root, dirs, files in os.walk(base_path):
        images = []

        for file in files:
            if file.lower().endswith(IMAGE_EXTENSIONS):
                full_path = os.path.join(root, file)

                # make path relative to base folder
                rel_path = os.path.relpath(full_path, base_path)

                images.append(rel_path)

        if images:
            folder_name = os.path.relpath(root, base_path)
            data[folder_name] = images

    return data


def save_json(data, output_file):
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)


if __name__ == "__main__":
    result = get_images_grouped_by_folder(FOLDER_PATH)
    save_json(result, OUTPUT_FILE)

    print("Done. JSON created.")