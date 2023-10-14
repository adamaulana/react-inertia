const Ziggy = {"url":"http:\/\/localhost","port":null,"defaults":{},"routes":{"sanctum.csrf-cookie":{"uri":"sanctum\/csrf-cookie","methods":["GET","HEAD"]},"ignition.healthCheck":{"uri":"_ignition\/health-check","methods":["GET","HEAD"]},"ignition.executeSolution":{"uri":"_ignition\/execute-solution","methods":["POST"]},"ignition.updateConfig":{"uri":"_ignition\/update-config","methods":["POST"]},"user.create":{"uri":"user\/create","methods":["GET","HEAD"]},"user.index":{"uri":"user","methods":["GET","HEAD"]},"user.store":{"uri":"user","methods":["POST"]},"user.show":{"uri":"user\/{user}","methods":["GET","HEAD"]},"user.edit":{"uri":"user\/{user}\/edit","methods":["GET","HEAD"]},"user.update":{"uri":"user\/{user}","methods":["PUT","PATCH"]},"user.destroy":{"uri":"user\/{user}","methods":["DELETE"]}}};

if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}

export { Ziggy };
