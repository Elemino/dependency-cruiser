const tryRequire   = require("semver-try-require");
const $package     = require("../../../package.json");

/*
 * coffeescript's npm repo was renamed from coffee-script to coffeescript
 * which means that we can encounter both in the wild (at least for a while)
 * As long as that is happening: first try coffeescript, then coffee-script.
 */
function getCoffeeScriptModule(){
    let lRetval = tryRequire(
        "coffeescript",
        $package.supportedTranspilers.coffeescript
    );

    /* istanbul ignore if*/
    if (lRetval === false){
        lRetval = tryRequire(
            "coffee-script",
            $package.supportedTranspilers["coffee-script"]
        );
    }
    return lRetval;
}

const coffeeScript = getCoffeeScriptModule();

module.exports = (pLiterate) => ({
    isAvailable : () => coffeeScript !== false,
    transpile : (pSource) => {
        const lOptions = pLiterate ? {literate:true} : {};

        return coffeeScript.compile(pSource, lOptions);
    }
});

/* eslint import/order: off */
