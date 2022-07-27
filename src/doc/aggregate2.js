db.user.aggregate([
    { $match: {
        email: /[@]gmail[.]com/,
        status: { $in: [2, 1]},
    }},
    { $project: {
        //_id: 1,
        //email: 1,
        informEmail: 0
    }},
    { $addFields: {
        avt: { $ifNull: ["$avt", 0]}
    }},
    { $addFields: {
        a1: { $add: ["$avt", 10] }
    }},
    { $match: { $expr: { $and: [
        { $eq: ["$wiki", ObjectId("62cdbffdd0cb8c07cb98367b")]}
    ]}}},
    
    { $project: {
        _id: 1,
        wiki: 1,
        email: 1,
    }},
    
    { $lookup: {
        from: "wiki",
        localField: "wiki",
        foreignField: "_id",
        as: "wikiObj"
    }},
    { $unwind: {
        path: "$wikiObj"
    }},
    
    { $addFields: {
        number2: "$wikiObj.number",
        "wikiObj.newKey": "$email"
    }},
    
    { $replaceRoot: {
        newRoot: "wikiObj"
    }}
    
]);