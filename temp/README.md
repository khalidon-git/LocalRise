# temp/

A temporary **intake** folder — nothing else. Drop a new photo, video, or
brief here when handing it off for processing.

This folder should be empty (aside from this file) between tasks. When
something lands here:

1. Process it (resize/compress/crop as needed — see `assets/README.md` for
   the pattern used so far) into its real destination in `public/`.
2. If the original is worth keeping for future reprocessing, move it to
   `assets/originals/`.
3. If it was only reference material (a brief, a note) rather than a shippable
   asset, fold anything useful into the relevant `docs/` or `knowledge/` file
   and delete it from here.
4. Update any code/content that references the new asset.

Everything under `temp/` except this file is gitignored — it's a staging
area, not permanent storage. Don't leave anything here you'd be upset to
lose; move it out.
