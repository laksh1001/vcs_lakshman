# 🛠️ VCS Lakshman (`vcs_lakshman`)

A custom, lightweight Version Control System built to demonstrate the core mechanics of source code tracking, object hashing, staging index management, and commit history trees.

---

## 📌 Architecture Overview

`vcs_lakshman` tracks changes by converting files into immutable object graphs, similar to production VCS engines like Git.

```text
 ┌────────────────┐          ┌────────────────┐          ┌────────────────┐
 │ Working Directory│ ──add──►│ Staging Index  │──commit─►│ Object Store   │
 │ (Raw Files)    │          │ (Tracked State)│          │ (Blobs/Trees)  │
 └────────────────┘          └────────────────┘          └────────────────┘
                                                                 │
                                                                 ▼
                                                         ┌────────────────┐
                                                         │ Commit Graph   │
                                                         │ (HEAD Pointer) │
                                                         └────────────────┘


The 3 Main Object Types Stored Here:

┌────────────────────────────────────────────────────────────────────────┐
 │                              COMMIT                                    │
 │  (Holds parent commit hash, author info, timestamp, commit message)   │
 └──────────────────────────────────┬─────────────────────────────────────┘
                                    │ points to top-level
                                    ▼
 ┌────────────────────────────────────────────────────────────────────────┐
 │                               TREE                                     │
 │  (Represents a directory; maps filenames & permissions to hashes)      │
 └──────────────┬──────────────────────────────────────────┬──────────────┘
                │ points to file                           │ points to subfolder
                ▼                                          ▼
 ┌──────────────────────────────┐          ┌──────────────────────────────┐
 │             BLOB             │          │       SUB-DIRECTORY TREE     │
 │   (Raw file content only)    │          │  (Maps files in subfolder)   │
 └──────────────────────────────┘          └──────────────────────────────┘



📁 Internal Directory Layout

.vcs/
├── config          # Repo settings and user identity
├── HEAD            # Reference to active branch or commit hash
├── index           # Staging area index mapping paths to hashes
├── objects/        # Content-addressable store (SHA-1 / SHA-256)
│   ├── 0a/         # First 2 chars of hash
│   │   └── f31c... # Remaining hash payload (Blobs, Trees, Commits)
└── refs/           # Pointers to branches and tags
    └── heads/
        └── main    # Points to the latest commit hash on 'main'
