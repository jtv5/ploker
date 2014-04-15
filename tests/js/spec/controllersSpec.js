describe('pokerTableCtrl', function(){

    beforeEach(module('plannerPoker'));
 
    it('should display cards on the table', function() {
        var scope = {},
        ctrl = new pokerTableCtrl(scope);

        expect(scope.phones.length).toBe(3);
    });
 
});