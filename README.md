# carcassonne-shading
This is some JS that manipulates SVG files used to print or laser-cut tiles for the board game Carcassonne.

[![CC BY-NC-SA license](https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png)](http://creativecommons.org/licenses/by-nc-sa/4.0/)

### Explore it here (Chrome only, for now):
#### https://tomkinsc.github.io/carcassonne-shading/

### About

![game](https://raw.githubusercontent.com/tomkinsc/carcassonne-shading/gh-pages/result.jpg)

My girlfriend and I like to play the board game Carcassonne. We decided to make a version of our own using a 40W hobby laser. I made a little tool to dial in the settings needed for the input files for the machine, which are SVG files.

JavaScript manipulates the SVG files. That's one file type usable by the laser cutting machine. Due to how the machine operates, it's a mixture of vector cutting lines for the fine lines and tile edges, and bitmap images for the raster fill and shading. The vector lines are easy to change in color by adjusting DOM attributes, while for the fill images I change the colors on a pixel-by-pixel basis before spitting out the finished SVG files in a client side-made zip file.

This was helpful because beyond the laser power settings, it took some fiddling to get the right shades of gray for cutting depths that worked with the multilayer plywood I was using (some layers are darker than others; had to make it look good). The files can also of course be colored for printing.

The different regions are segmented by their colors in the original files, which were created via Inkscape with outline vector lines over bitmap fill images. The lines were drawn by hand by my girlfriend and I using Inkscape, based on a purchased copy of Carcassonne we have. The images were made by rendering the outline SVGs to PNGs, filling in regions using GIMP, then reimporting them into Inkscape, and overlaying the vector outlines.

For meeple, she laboriously cut them out by hand from Sculpey clay. A cookie cutter would have been ideal but it took her less time to cut the figures than for me to bend copper flashing into the shape of a person or to devise a way to extrude the figures.
