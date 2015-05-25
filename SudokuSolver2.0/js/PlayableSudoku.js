
var Sudoku = ( function ( $ ){
	var _instance, _game,

		defaultConfig = {

			'validate_on_insert': true,

			'show_solver_timer': true,

			'show_recursion_counter': true,

			'solver_shuffle_numbers': true
		},
		paused = false,
		counter = 0;

	function init( config ) {
		conf = $.extend( {}, defaultConfig, config );
		_game = new Game( conf );


		return {
			
			//show the board
			getGameBoard: function() {
				return _game.buildGUI();
			},

			//Reset the game board.

			reset: function() {
				_game.resetGame();
			},

			//validate the game board
			validate: function() {
				var isValid;

				isValid = _game.validateMatrix();
				$( '.sudoku-container' ).toggleClass( 'valid-matrix', isValid );
			},
			
		};
	}

	function Game( config ) {
		this.config = config;

		// Initialize game parameters
		this.recursionCounter = 0;
		this.$cellMatrix = {};
		this.matrix = {};
		this.validation = {};

		this.resetValidationMatrices();
		return this;
	}


	Game.prototype = {
		
		//create 9x9 matrix

		buildGUI: function() {
			var $td, $tr,
				$table = $( '<table>' )
					.addClass( 'sudoku-container' );

			for ( var i = 0; i < 9; i++ ) {
				$tr = $( '<tr>' );
				this.$cellMatrix[i] = {};

				for ( var j = 0; j < 9; j++ ) {
					// Build the input
					this.$cellMatrix[i][j] = $( '<input>' )
						.attr( 'maxlength', 1 )
						.data( 'row', i )
						.data( 'col', j )
						.on( 'keyup', $.proxy( this.onKeyUp, this ) );

					$td = $( '<td>' ).append( this.$cellMatrix[i][j] );
					// Calculate section ID
					sectIDi = Math.floor( i / 3 );
					sectIDj = Math.floor( j / 3 );
					// Set the design for different sections
					if ( ( sectIDi + sectIDj ) % 2 === 0 ) {
						$td.addClass( 'sudoku-section-one' );
					} else {
						$td.addClass( 'sudoku-section-two' );
					}
					// Build the row
					$tr.append( $td );
				}
				// Append to table
				$table.append( $tr );
			}
			// Return the GUI table
			return $table;
		},

		onKeyUp: function( e ) {
			var sectRow, sectCol, secIndex,
				starttime, endtime, elapsed,
				isValid = true,
				val = $.trim( $( e.currentTarget ).val() ),
				row = $( e.currentTarget ).data( 'row' ),
				col = $( e.currentTarget ).data( 'col' );

			// Reset board validation class
			$( '.sudoku-container' ).removeClass( 'valid-matrix' );

			// Validate, but only if validate_on_insert is set to true
			if ( this.config.validate_on_insert ) {
				isValid = this.validateNumber( val, row, col, this.matrix.row[row][col] );
				// Indicate error
				$( e.currentTarget ).toggleClass( 'sudoku-input-error', !isValid );
			}

			// Calculate section identifiers
			sectRow = Math.floor( row / 3 );
			sectCol = Math.floor( col / 3 );
			secIndex = ( row % 3 ) * 3 + ( col % 3 );

			// Cache value in matrix
			this.matrix.row[row][col] = val;
			this.matrix.col[col][row] = val;
			this.matrix.sect[sectRow][sectCol][secIndex] = val;
		},

		//reset board
		resetGame: function() {
			this.resetValidationMatrices();
			for ( var row = 0; row < 9; row++ ) {
				for ( var col = 0; col < 9; col++ ) {
					// Reset GUI inputs
					this.$cellMatrix[row][col].val( '' );
				}
			}

			$( '.sudoku-container input' ).removeAttr( 'disabled' );
			$( '.sudoku-container' ).removeClass( 'valid-matrix' );
		},


		resetValidationMatrices: function() {
			this.matrix = { 'row': {}, 'col': {}, 'sect': {} };
			this.validation = { 'row': {}, 'col': {}, 'sect': {} };

			// Build the row/col matrix and validation arrays
			for ( var i = 0; i < 9; i++ ) {
				this.matrix.row[i] = [ '', '', '', '', '', '', '', '', '' ];
				this.matrix.col[i] = [ '', '', '', '', '', '', '', '', '' ];
				this.validation.row[i] = [];
				this.validation.col[i] = [];
			}

			// Build the section matrix and validation arrays
			for ( var row = 0; row < 3; row++ ) {
				this.matrix.sect[row] = [];
				this.validation.sect[row] = {};
				for ( var col = 0; col < 3; col++ ) {
					this.matrix.sect[row][col] = [ '', '', '', '', '', '', '', '', '' ];
					this.validation.sect[row][col] = [];
				}
			}
		},

		//validate inserted number
		validateNumber: function( num, rowID, colID, oldNum ) {
			var isValid = true,
				// Section
				sectRow = Math.floor( rowID / 3 ),
				sectCol = Math.floor( colID / 3 );

			oldNum = oldNum || '';

			// Remove oldNum from the validation matrices,
			// if it exists in them.
			if ( this.validation.row[rowID].indexOf( oldNum ) > -1 ) {
				this.validation.row[rowID].splice(
					this.validation.row[rowID].indexOf( oldNum ), 1
				);
			}
			if ( this.validation.col[colID].indexOf( oldNum ) > -1 ) {
				this.validation.col[colID].splice(
					this.validation.col[colID].indexOf( oldNum ), 1
				);
			}
			if ( this.validation.sect[sectRow][sectCol].indexOf( oldNum ) > -1 ) {
				this.validation.sect[sectRow][sectCol].splice(
					this.validation.sect[sectRow][sectCol].indexOf( oldNum ), 1
				);
			}
			// Skip if empty value

			if ( num !== '' ) {


				// Validate value
				if (
					// Make sure value is numeric
					$.isNumeric( num ) &&
					// Make sure value is within range
					Number( num ) > 0 &&
					Number( num ) <= 9
				) {
					// Check if it already exists in validation array
					if (
						$.inArray( num, this.validation.row[rowID] ) > -1 ||
						$.inArray( num, this.validation.col[colID] ) > -1 ||
						$.inArray( num, this.validation.sect[sectRow][sectCol] ) > -1
					) {
						isValid = false;
					} else {
						isValid = true;
					}
				}


				this.validation.row[rowID].push( num );
				this.validation.col[colID].push( num );
				this.validation.sect[sectRow][sectCol].push( num );
			}

			return isValid;
		},

		//validate matrix
		validateMatrix: function() {
			var isValid, val, $element,
				hasError = false;

			// Go over entire board, and compare to the cached
			// validation arrays
			for ( var row = 0; row < 9; row++ ) {
				for ( var col = 0; col < 9; col++ ) {
					val = this.matrix.row[row][col];
					// Validate the value
					isValid = this.validateNumber( val, row, col, val );
					this.$cellMatrix[row][col].toggleClass( 'sudoku-input-error', !isValid );
					if ( !isValid ) {
						hasError = true;
					}
				}
			}
			return !hasError;
		},

	};

	function getRandomInt(min, max) {
		return Math.floor( Math.random() * ( max + 1 ) ) + min;
	}

	return {

		getInstance: function( config ) {
			if ( !_instance ) {
				_instance = init( config );
			}
			return _instance;
		}
	};
} )( jQuery );

/**
 * reference: Moriel Schottlender's tutorial
 */