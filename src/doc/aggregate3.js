db.user.aggregate([
    { $limit: 1 },
    { $project: {
        _id: 0,
    }},
    { $project: {
        _id: 1,
    }},
    
    // Arr1
    { $lookup: {
        from: "wiki",
        pipeline: [
            { $limit: 3 }
        ],
        as: "wikis"
    }},
    
    { $addFields: {
        listIds: "$wikis._id"
    }},
    
    
    { $addFields: {
        rs: { $filter: {
            input: wikis,
            if
        }}
    }},
    
    
    
    // arr 2
    { $lookup: {
        from: "user",
        pipeline: [
            //{ $limit: 2 }
            { $match: {
                email: "vantoan8x@gmail.com"
            }},
            { $project: {
                email: 1,
                //name: 0,
            }},
            
            // { $project: {
            //     _id: 0,
            // }},
        ],
        as: "users"
    }},
    
    
    { $unwind: {
        path: "$users"
    }},
    
    
    // Mixed
    { $addFields: {
        lists: {
            $concatArrays: [["$users"], "$wikis"]
        },
    }},
    
    { $addFields: {
        size: { $size: "$lists" }
    }},
    
    { $lookup: {
      from: "user",
      let: {
          arr2: "$lists"
        },
        pipeline: [
            { $limit: 1 },
            { $project: {
                _id: 0,
            }},
            { $project: {
                _id: 1,
            }},
            
            { $addFields: {
                arrs: "$$arr2",
            }},
            { $unwind: {
                path: "$arrs"
            }},
            { $unwind: {
                path: "$arrs",
            }},
            { $replaceRoot: {
                newRoot: "$arrs"
            }},
            
            // { $match: {
            //     name: /[t|i]/gi
            // }}
            
            { $sort: {
                name: -1,
                title: 1,
            }},
            
            
            
            
            
        ],
        as: "r2"
    }},
    
    { $unwind: {
        path: "$r2"
    }},
    
    { $group: {
        _id: "$r2._id",
        r2: { $first: "$r2"},
        wikis: { $first: "$wikis" },
        users: { $first: "$users" },
        lists: { $first: "$lists" },
        size: { $first: "$size" },
    }},
    
    
]);

