UNIT_TESTS = test/*.js

test:
	mocha --timeout 10000 --reporter nyan $(UNIT_TESTS)
	
.PHONY: test