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
    
    
    // arr 2
    { $lookup: {
        from: "user",
        pipeline: [
            { $limit: 2 }
        ],
        as: "users"
    }},
    
    
    // Mixed
    { $addFields: {
        lists: {
            $concatArrays: ["$users", "$wikis"]
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
            }}
            
            
            
        ],
        as: "r2"
    }},
    
    
]);