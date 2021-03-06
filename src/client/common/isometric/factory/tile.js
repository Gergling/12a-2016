angular.module('commonIsometric').service("commonIsometricFactoryTile",
function (commonMathsFactoryPoint, commonIsometricServiceView, commonCSSClassFactory) {
    // A Tile expresses a Point.
    var Tile = function () {
        var data = {
            location: commonMathsFactoryPoint({x: 0, y: 0, z: 0}),
            size: commonMathsFactoryPoint({x: 100, y: 50}),
            show: true,
            hover: false,
            select: false,
            cssClass: commonCSSClassFactory()
        };

        function cssClass() {return data.cssClass; }

        function size() {return data.size; }
        function centre() {
            var point = size().copy();
            point.multiply(0.5);
            point.add(location());
            return point;
        }
        function location() {
            return data.location;
        }
        function left() {
            return ((location().x() + location().z() - commonIsometricServiceView.camera().z()) * size().x() / 2) + commonIsometricServiceView.camera().x();
        }
        function top() {
            return ((location().x() + 1 - location().z() - location().y()) * size().y() / 2) + commonIsometricServiceView.camera().y();
        }
        function show(value) {
            if (value === false || value) {data.show = value; }
            return data.show;
        };
        function hover(value) {
            if (value || value === false) {data.hover = value; }
            return data.hover;
        };
        function select(value) {
            if (value || value === false) {data.select = value; }
            return data.select;
        };
        function boundsCheck(x, y) {
            var half = {
                    w: size().x() / 2,
                    h: size().y() / 2
                },
                asc = x / 2,
                desc = half.h - asc,
                quad = {
                    h: (x < half.w ? "left": "right"),
                    v: (y < half.h ? "top": "bottom"),
                },
                tests = [
                    quad.h === "left" && quad.v === "top" && y > desc,
                    quad.h === "right" && quad.v === "top" && y > asc - half.h,
                    quad.h === "left" && quad.v === "bottom" && y < asc + half.h,
                    quad.h === "right" && quad.v === "bottom" && y < desc + size().y()
                ],
                inside = false;

            tests.forEach(function (test) {
                if (test) {inside = true; }
            });

            return inside;
        };

        cssClass().add('isometric-square');
        cssClass().add('hover', hover);

        angular.extend(this, {
            centre: centre,
            location: location,
            left: left,
            top: top,
            size: size,
            show: show,
            hover: hover,
            select: select,
            boundsCheck: boundsCheck,
            cssClass: cssClass
        });
    };

    function instantiate() {return new Tile(); };

    return instantiate;
});
