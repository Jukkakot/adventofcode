var fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
const rulesSplit = require("./testRules.txt").split("\r\n")
var rulesArr = []
for (line of rulesSplit) {
    line = line.replace(/\s/g, '')
    line = line.replace(/\./g, '')
    line = line.replace(/bags/g, '')
    line = line.replace(/bag/g, '')
    if (line.includes("containnoother")) {
        rulesArr.push([line.split("containnoother")[0], []])
        continue
    }
    var rule = []
    var splitLine = line.split("contain")
    rule.push(splitLine[0])
    var ruleInBag = []
    var tempBags = splitLine[1].split(",")
    for (innerBag of tempBags) {
        ruleInBag.push([Number(innerBag[0]), innerBag.slice(1)])
    }
    rule.push(ruleInBag)
    rulesArr.push(rule)
}
var outerBags = []
const shinygold = "shinygold"
var inBags = [shinygold]

var relevantRules = []
var shinygoldRule
var summed = true
while (summed) {
    summed = false
    for (rule of rulesArr) {
        var outColor = rule[0]
        var ruleInBags = rule[1]
        if (outColor == shinygold) {
            shinygoldRule = rule
            continue
        }
        for (ruleInBag of ruleInBags) {
            var inAmount = ruleInBag[0]
            var inColor = ruleInBag[1]
            if (inBags.includes(inColor)) {
                if (!relevantRules.includes(rule)) {
                    relevantRules.push(rule)
                }
                if (!inBags.includes(outColor)) {
                    inBags.push(outColor)
                    summed = true
                }
                if (!outerBags.includes(outColor)) {
                    summed = true
                    outerBags.push(outColor)
                }

            }

        }
    }
}
var totalAmount = 0
var colorsToCheck = shinygoldRule[1]

var sum = 0
for (shinyRule of colorsToCheck) {
    sum += shinyRule[0]
}
var summed = true
var checkedOutBags = []

var corrSum = 0
// while (summed) {
//     summed = false

//     for (ctc of colorsToCheck) {
//         // console.log(ctc)
//         corrSum += ctc[0]
//         var ctcNumb = ctc[0]
//         for (rule of rulesArr) {
//             var outColor = rule[0]
//             var ruleInBags = rule[1]
//             //&& !checkedOutBags.includes(outColor)
//             if (ctc[1] === outColor) {
//                 summed = true
//                 colorsToCheck.splice(colorsToCheck.indexOf(ctc), 1)
//                 ruleInBags.forEach(bag => colorsToCheck.push(bag))
//                 for (ruleInBag of ruleInBags) {
//                     ruleInBag[0] *= ctcNumb
//                     sum += ctcNumb
//                 }
//             }
//         }

//     }

// }

// console.log(outerBags, "\n", outerBags.length, "on 148", outerBags.length === 148)
// console.log("has dupes", (new Set(outerBags).size !== outerBags.length))
// console.log("includes shiny gold", outerBags.includes(shinygold))
// console.log("checked out bags", checkedOutBags)
// console.log("Colors to check", colorsToCheck)
// // for(ctc of colorsToCheck){
// //     sum += ctc[0]
// // }
// console.log("corrsum:", corrSum)
// console.log("sum:", sum)

function bagSum(bag) {
    // console.log(ctc)
    var kisko =1
    // if (bag.length === 0) {
    //     // console.log("returning empty bag",bag)
    //     return kisko
    // }
    for (var rule of rulesArr) {
        var outColor = rule[0]
        var ruleInBags = rule[1]
        // console.log(ruleInBags)
        // if (ruleInBags.length === 0) {
        //     // console.log("returning empty rule",ruleInBags)
        //     return kisko
        // }
        // console.log(ctcBag)
        if (bag[1] === outColor) {
            // ruleInBags.forEach(bag=> {ctc.push(bag)})
            for (var inBag of ruleInBags) {
                // bag[0]*=inBag[0]
                inBag[0] *= bag[0]
                kisko += bagSum(inBag)
                // inBag[0] *= bag[0]
                //  kisko += bag[0]
                // kisko *=bagSum(inBag)
                // kisko += bagSum(inBag)
                // kisko += inBag[0]
               
            }
            break
        }
    }
    console.log("returning end",kisko)
    return kisko
}
var jaahasSUm = 0
for (bag of shinygoldRule[1]) {
    console.log(bag)
    jaahasSUm += bagSum(bag)
}
console.log("new sum", jaahasSUm)