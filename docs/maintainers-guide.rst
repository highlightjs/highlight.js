Maintainer's guide
==================


Commit policy
-------------

* Pull requests from outside contributors require a review from a maintainer.

* Maintainers should avoid working on a master branch directly and create branches for everything. A code review from another maintainer is recommended but not required, use your best judgment.



Release process
---------------

Releases (minor) typically happen on a 6-week schedule.

For major/minor releases you'll be releasing from ``master``.  For patch releases you'll be releasing from a stable branch, such as ``9-16-stable``.  This allows ongoing development of new features to continue in isolation (in master) without those changes leaking into patch releases (which should focus only on fixing breaking changes).

The goal being that minor version series always get more stable over time and that patch releases do not add features.

* For patch releases: First switch to the associated stable branch (i.e., ``9-16-stable``)

* Update CHANGES.md with everything interesting since the last update.

* Update version numbers using the three-part x.y.z notation everywhere:

  * The header in CHANGES.md (this is where the site looks for the latest version number)
  * ``"version"`` attribute in package.json
  * ``"version"`` attribute in package-lock.json (run `npm install`)
  * Two places in docs/conf.py (``version`` and ``release``)

* Commit the version changes and tag the commit with the version number (``9.16.2``, no "v" prefix or anything like that)

* For major/minor releases: Create a new ``[major]-[minor]-stable`` branch such as ``9-16-stable``

* Push the commit and the tags (``git push && git push --tags``)


Pushing the tag triggers the update process which can be monitored at http://highlightjs.org/api/release/

When something didn't work *and* it's fixable in code (version numbers mismatch, last minute patches, etc), simply make another release incrementing the third (revision) part of the version number.
