from copy import deepcopy

def clean_for_public(data: dict) -> dict:
    data = deepcopy(data)
    data["id"] = str(data.pop("_id"))
    data.pop("user_id", None)

    for entry in data.get("entries", []):
        entry.pop("user_id", None)
        entry.pop("email", None)
        if "_id" in entry:
            entry["id"] = str(entry.pop("_id"))

    return data
