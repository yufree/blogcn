var match,
    scale,
    TARGET_WIDTH = 320;

if (match = navigator.userAgent.match(/Android (\d+\.\d+)/)) {
    if (parseFloat(match[1]) < 4.4) {
        if (TARGET_WIDTH == 320) TARGET_WIDTH++;
        var scale = window.screen.width / TARGET_WIDTH;
        document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=' + TARGET_WIDTH + ', initial-scale = ' + scale + ', target-densitydpi=device-dpi');
    }
} else {
    document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=' + TARGET_WIDTH);
}
