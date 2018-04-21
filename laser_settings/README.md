Pew pew. This directory contains settings to cut the pieces out of 0.25" (~6.35mm) plywood, optimized for a 75W Universal (ULS) CO2 laser cutter.

Assumptions:
- Grayscale is raster etch (region fill)
- Red is vector etch (fine lines)
- Blue is final cutout

With the colors used in this order, the ULS software should etch each piece before cutting it out so the material remains in focus when working on the art.

When setting z-depth/focus, it often helps to set the focal point in the middle of the material rather than on the top surface to minimize kerf loss on the back side. This is easy to set: set the focus to the top plane of the material, then decrease the z-height by half the material thickness.