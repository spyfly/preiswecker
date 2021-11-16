db.createUser({
    user: 'bob',
    pwd: 'seheshs8w345ztw9',
    roles: [
        {
            role: 'dbOwner',
            db: 'preiswecker',
        },
    ],
});