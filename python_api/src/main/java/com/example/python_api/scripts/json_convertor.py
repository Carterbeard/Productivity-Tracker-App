import json
import
from datetime import datetime

bools = sys.argv[1]
raw = sys.argv[2]
# ── LOAD YOUR JSON FILE ───────────────────────────────────────────────────────
# Replace 'data.json' with your actual file path
#with open("data.json", "r") as f:
#    raw = json.load(f)

# ── AUTO-DETECT FORMAT ────────────────────────────────────────────────────────
# Handles the two most common MySQL JSON export shapes:
#
# Shape A — list of row objects:
# [
#   {"date": "2024-01-01", "steps": 8000, "study_time": 2.5, ...},
#   {"date": "2024-01-02", "steps": 7500, "study_time": 1.0, ...}
# ]
#
# Shape B — column-arrays object:
# {
#   "date":        ["2024-01-01", "2024-01-02"],
#   "steps":       [8000, 7500],
#   "study_time":  [2.5, 1.0],
#   "sleep":       [7.0, 6.5],
#   "screen_time": [4.0, 5.5],
#   "mood":        [7, 5]
# }

# ── FIELD NAME MAP ────────────────────────────────────────────────────────────
# If your SQL column names differ from the plot variable names, map them here.
# Left  = your SQL column name
# Right = what the plot script expects
FIELD_MAP = {
    "date":        "date",
    "steps":       "steps",
    "study_time":  "study_time",   # e.g. change "studytime" -> "study_time"
    "sleep":       "sleep",
    "screen_time": "screen_time",
    "mood":        "mood",
}

# ── PARSE ─────────────────────────────────────────────────────────────────────
def extract(raw, field_map):
    inv = {v: k for k, v in field_map.items()}  # plot_name -> sql_name

    if isinstance(raw, list):
        # Shape A — list of row dicts
        rows = raw
        def get(row, plot_name):
            sql_name = inv.get(plot_name, plot_name)
            return row.get(sql_name) or row.get(plot_name)

        dates       = [get(r, "date")        for r in rows]
        steps       = [get(r, "steps")       for r in rows]
        study_time  = [get(r, "study_time")  for r in rows]
        sleep       = [get(r, "sleep")       for r in rows]
        screen_time = [get(r, "screen_time") for r in rows]
        mood        = [get(r, "mood")        for r in rows]

    elif isinstance(raw, dict):
        # Shape B — dict of column arrays
        def col(plot_name):
            sql_name = inv.get(plot_name, plot_name)
            return raw.get(sql_name) or raw.get(plot_name) or []

        dates       = col("date")
        steps       = col("steps")
        study_time  = col("study_time")
        sleep       = col("sleep")
        screen_time = col("screen_time")
        mood        = col("mood")

    else:
        raise ValueError(f"Unrecognised JSON structure: {type(raw)}")

    return dates, steps, study_time, sleep, screen_time, mood

dates, steps, study_time, sleep, screen_time, mood = extract(raw, FIELD_MAP)

# ── NORMALISE DATES ───────────────────────────────────────────────────────────
# Ensures dates are clean YYYY-MM-DD strings regardless of how MySQL exported them
def normalise_date(d):
    if d is None:
        return None
    d = str(d).strip()
    # Handle common MySQL formats: "2024-01-01", "2024-01-01 00:00:00", "01/01/2024"
    for fmt in ("%Y-%m-%d", "%Y-%m-%d %H:%M:%S", "%d/%m/%Y", "%m/%d/%Y"):
        try:
            return datetime.strptime(d, fmt).strftime("%Y-%m-%d")
        except ValueError:
            continue
    raise ValueError(f"Unrecognised date format: {d!r}")

dates = [normalise_date(d) for d in dates]

# ── CAST NUMERICS ─────────────────────────────────────────────────────────────
# MySQL sometimes returns numbers as strings — this ensures they're always numeric
def to_float(v):
    return float(v) if v is not None else None

def to_int(v):
    return int(float(v)) if v is not None else None

steps       = [to_int(v)   for v in steps]
study_time  = [to_float(v) for v in study_time]
sleep       = [to_float(v) for v in sleep]
screen_time = [to_float(v) for v in screen_time]
mood        = [to_int(v)   for v in mood]

# ── READY TO USE ──────────────────────────────────────────────────────────────
# These variables now match exactly what metrics_plot.py expects.
# You can either paste this file's output directly into metrics_plot.py,
# or import them:
#
#   from json_converter import dates, steps, study_time, sleep, screen_time, mood

print(f"Loaded {len(dates)} rows")
print(f"  Date range : {dates[0]}  →  {dates[-1]}")
print(f"  Steps      : {steps[:3]} ...")
print(f"  Study time : {study_time[:3]} ...")
print(f"  Sleep      : {sleep[:3]} ...")
print(f"  Screen time: {screen_time[:3]} ...")
print(f"  Mood       : {mood[:3]} ...")
