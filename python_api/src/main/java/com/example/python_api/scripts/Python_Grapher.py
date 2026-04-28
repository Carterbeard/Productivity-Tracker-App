import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import matplotlib.cm as cm
import numpy as np
from datetime import datetime

#carter the boolean array which the code works with is right bellow its called show_metrics
#tobin the format of the arrays is like the test data, the json code should convert json into this format
#to run the actiual code the function is called plot_graph, it takes all the arrays with the metrics as parameters


import json
import sys
from datetime import datetime

bools = sys.argv[1]
show_metrics = bools.split()

# ── LOAD YOUR JSON FILE ───────────────────────────────────────────────────────
# Replace 'data.json' with your actual file path
with open(sys.argv[2], "r") as f:
    raw = json.load(f)

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
    "hoursStudied":  "study_time",   # e.g. change "studytime" -> "study_time"
    "sleep":       "sleep",
    "screenTime": "screen_time",
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
print(f"  Date range : {dates[0]}  -  {dates[-1]}")
print(f"  Steps      : {steps[:3]} ...")
print(f"  Study time : {study_time[:3]} ...")
print(f"  Sleep      : {sleep[:3]} ...")
print(f"  Screen time: {screen_time[:3]} ...")
print(f"  Mood       : {mood[:3]} ...")



#        (steps, study_time, sleep, screen_time, mood)
#show_metrics = [True, True, True, True, False]

# ── TEST DATA ──────────────────────────────────────────────────────────────────────
# Replace these with your actual data. All lists must be the same length.

dates = [
    "2024-01-01", "2024-01-02", "2024-01-03", "2024-01-04", "2024-01-05",
    "2024-01-06", "2024-01-07", "2024-01-08", "2024-01-09", "2024-01-10",
]

steps       = [8.2, 6.5, 0, 4.3, 0, 7.6, 5.1, 1.3, 8.9, 7.3]
study_time  = [2.5,  1.0,  3.0,  0.5,  2.0,  1.5,  0.0,  4.0,  2.5,  1.5]   # hours
sleep       = [7.0,  6.5,  8.0,  5.5,  7.5,  6.0,  9.0,  7.0,  6.5,  8.0]   # hours
screen_time = [4.0,  5.5,  3.0,  6.0,  4.5,  5.0,  7.0,  3.5,  4.0,  5.0]   # hours
mood        = [7,    5,    8,    4,    7,    6,    3,    9,    7,    6   ]    # 1–10
# ── TEST DATA ──────────────────────────────────────────────────────────────────────

def plot_graph(dates,steps,study_time,sleep,screen_time,mood,show_metrics):
    date_objs = [datetime.strptime(d, "%Y-%m-%d") for d in dates]

    # ── METRIC DEFINITIONS ────────────────────────────────────────────────────────

    metrics = [
        {"label": "Steps",        "data": steps,       "color": "#4C72B0", "ylabel": "Steps"},
        {"label": "Study Time",   "data": study_time,  "color": "#F90707", "ylabel": "Hours"},
        {"label": "Sleep",        "data": sleep,       "color": "#00FFEA", "ylabel": "Hours"},
        {"label": "Screen Time",  "data": screen_time, "color": "#FFEE00", "ylabel": "Hours"},
    ]

    # ── PLOT ──────────────────────────────────────────────────────────────────────

    fig, ax = plt.subplots(figsize=(13, 6))
    fig.patch.set_facecolor("#1B6E24")
    ax.set_facecolor("#1B6E24")

    plotted_any = False

    # -- Line metrics (indices 0–3) ------------------------------------------------
    for i, metric in enumerate(metrics):
        if show_metrics[i] != "True":
            continue
        ax.plot(
            date_objs,
            metric["data"],
            label=metric["label"],
            color=metric["color"],
            linewidth=1,
            marker="o",
            markersize=4,
            zorder=3,
        )
        plotted_any = True

    # -- Mood as coloured background scatter / hue band (index 4) -----------------
    if show_metrics[4] == "True" :
        norm = plt.Normalize(vmin=1, vmax=10)
        cmap = cm.get_cmap("RdYlGn")  # red (low) → yellow → green (high)

        # Draw vertical colour bands between consecutive dates
        for i in range(len(date_objs) - 1):
            mid_mood = (mood[i] + mood[i + 1]) / 2
            ax.axvspan(
                date_objs[i], date_objs[i + 1],
                alpha=0.18,
                color=cmap(norm(mid_mood)),
                zorder=1,
            )

        # Scatter dots coloured by mood on the x-axis baseline area
        sc = ax.scatter(
            date_objs,
            [ax.get_ylim()[0]] * len(date_objs),  # will be updated after lines drawn
            c=mood,
            cmap=cmap,
            norm=norm,
            s=80,
            zorder=4,
            label="Mood (colour)",
            edgecolors="white",
            linewidths=0.5,
            )

        cbar = plt.colorbar(sc, ax=ax, pad=0.02)
        cbar.set_label("Mood (1–10)", color="white", fontsize=11)
        cbar.ax.yaxis.set_tick_params(color="white")
        plt.setp(cbar.ax.yaxis.get_ticklabels(), color="white")
        cbar.outline.set_edgecolor("#444")
        plotted_any = True

    # ── STYLING ───────────────────────────────────────────────────────────────────

    ax.xaxis.set_major_formatter(mdates.DateFormatter("%b %d"))
    ax.xaxis.set_major_locator(mdates.DayLocator())
    plt.setp(ax.xaxis.get_majorticklabels(), rotation=45, ha="right", color="white")
    plt.setp(ax.yaxis.get_majorticklabels(), color="white")

    ax.set_xlabel("Date", color="white", fontsize=12)
    ax.set_ylabel("Value", color="white", fontsize=12)
    ax.set_title("Daily Metrics Over Time", color="white", fontsize=15, fontweight="bold", pad=14)

    ax.tick_params(colors="white", which="both")
    for spine in ax.spines.values():
        spine.set_edgecolor("#444")

    ax.grid(color="#333", linestyle="--", linewidth=0.6, zorder=0)

    if plotted_any:
        legend = ax.legend(
            facecolor="#3EEC95",
            edgecolor="#444",
            labelcolor="white",
            fontsize=8,
            loc="upper right",
        )

    plt.tight_layout()
    plt.savefig("output/graph.png", dpi=150, bbox_inches="tight", facecolor=fig.get_facecolor())
    plt.show()
    print("Plot saved to metrics_plot.png")
    print("Graph saved successfully")
plot_graph(dates,steps,study_time,sleep,screen_time,mood,show_metrics)