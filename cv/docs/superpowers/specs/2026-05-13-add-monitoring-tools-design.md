# Design: Add Kibana and Grafana to Latest Assignment

## Summary
Add "Kibana" and "Grafana" to the technology list (Keywords) of the most recent experience entry to reflect their usage in that role.

## Architecture & Data Flow
The CV data is stored in `michel_de_bree.toml`. The `Experience` array contains entries for each role, with a `Keywords` list that references keys in a global `[Keywords]` table.

## Changes
- Modify `michel_de_bree.toml` to append `"Kibana"` and `"Grafana"` to the `Keywords` array of the first `[[Experience]]` entry.

## Verification
- Run `make` to ensure the CV still builds correctly and the new keywords appear in the generated PDF.
