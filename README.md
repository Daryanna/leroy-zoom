Leroy Zoom - jQuery Plugin
==========================

**A lightweigth and easy to use image zoom and magnify jQuery plugin with less than 4 KB.**

## How it works

This plugin works on a 2-steps zoom behavior:

1. Show details of image in the medium version when user over the thumb image;
2. Magnify and show details of the large image version when user click to "Magnify".

You'll need three versions of the same picture with different dimensions (small, medium, large). The first version (small) is shown by default and is the one which user will over the mouse to view the first-step details. Then, the user can "click to magnify" to see the second-step details of image and the large picture version is used for this.

Or let the **demo** speaks for itself: [Leroy Zoom Demo](http://url-to-the-demo.com)

## How to use

Call the JS and CSS of the plugin into the `<head>` section of your HTML page, as shown bellow. **Change** the path/url of this files to point to the right place where they are hosted. You can change the jQuery lib version too, but ensure plugin still working for that.

```html
<link rel="stylesheet" type="text/css" href="css/jquery.leroy-zoom.min.css">
<script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
<script type="text/javascript" src="js/jquery.leroy-zoom.min.js"></script>
```

Set the markup of the picure in you HTML body. Note that the picure must be into a `<a>` tag to work:

```html
<a href="#" id="demo-trigger" data-medium-url="sample/medium.jpg" data-large-url="sample/large.jpg">
    <img src="sample/small.jpg" />
</a>
```

Pay attention to `data-medium-url` and `data-large-url` attributes of the `<a>` tag. Put the medium and large image url versions here. You can keep they blank if for some reason the bigger images are missing, then zoom will not start in this case.

Now, make the Javascript apply the plugin behavior for the markup you just added. You can do that on your own way, or use the following script after the scripts included in you `<head>`:

```html
<script type="text/javascript">
    $(document).ready(function() {
        $("#demo-trigger").leroyZoom({
            zoomTop: 200, // Zoom frame distance from top in pixels
            zoomLeft: 560 // Zoom frame distance from left in pixels
        });
    });
</script>
```

That's it! You can use the **[demo page](http://url-to-the-demo.com)**  source code as guide to check if everything is ok.

## Options

Options are shown bellow with their default values and explanation:

```javascript
$("#demo-trigger").leroyZoom({
    zoomTop: 200,                   // Zoom frame distance from top in pixels
    zoomLeft: 560,                  // Zoom frame distance from left in pixels
    parent: "body",                 // Parent element of "leroy_zoom_frame"
    preload: "Loading...",          // Image loading state message
    error: "Image can't be loaded." // Image error message
});
```

You can change the CSS as you want too.

## Compatibility

Tested and working on IE9+, Chrome, Firefox, Opera and Safari.

PS.: Safari will show the zoom frame on square format :/. Other browsers works ok as a circle.


## Credits

This plugin is based on product image zoom feature in [Leroy Merlin e-commerce](http://www.leroymerlin.com.br/). It was designed by [@tiagoux](https://github.com/tiagoux) and develop by [@edison](https://github.com/edison) as a jQuery plugin. It's also based on code principles and behavior of Alen Grakalic's [EasyZoom Jquery Plugin](http://cssglobe.com/lab/easyzoom/easyzoom.html).

## Contribute

Feel free to refactor, fix bugs, optimize, extend compatibilty or anything, keeping the behavior principles and "weight" of the plugin sending us suggestions through issues or pull-request. We'll appreciate. :)
