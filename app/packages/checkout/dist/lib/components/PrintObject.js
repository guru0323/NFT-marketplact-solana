import React from 'react';
export var PrintObject = function (_a) {
    var content = _a.content;
    var formattedContent = JSON.stringify(content, null, 2);
    return React.createElement("pre", null, formattedContent);
};
//# sourceMappingURL=PrintObject.js.map