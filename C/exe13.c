// Program 4.13 Simple Simon
#include <stdio.h>
#include <ctype.h>
#include <stdbool.h>
#include <time.h>
#include <stdlib.h>

int main(int argc, const char *argv[])
{
    char another_game = 'Y';
    const unsigned int DELEY = 3;
    bool correct = true;
    unsigned int tries = 0;
    unsigned int digits = 0;
    time_t seed = 0;
    unsigned int number = 0;
    time_t wait_start = 0;

    clock_t start_time = 0;
    unsigned int score = 0;
    unsigned int total_digits = 0;
    unsigned int game_time = 0;

    /* More variable declarations for the program */

    // Describe how the game is played
    printf("\nTo play Simple Simon, ");
    printf("watch the screen for a sequence of digits.");
    printf("\nWatch carefully, as the digits are only displayed"
            "for %u second%s ", DELEY, DELEY==1?"!":"s!");
    printf("\nThe computer will remove them, and then prompt you "
            "to enter the same sequence."
            "\nWhen you do, you must put spaces between the digits.\n"
            "\nGoiod Luck!\nPress Enter to play\n");
    scanf(" %c", &another_game);

    // Game loop - one outer loop iteration is a complete game
    do{
        /* Initialize a game */
        correct = true;
        tries = 0;
        digits = 2;
        start_time = clock();

        /* Inner loop to play the game */
        while(correct){
            // a new attempt
            ++tries;

            // clear keyboard stdin
            fflush(stdin);

            // 
            // Initialize the random sequence
            srand(time(&seed));
            // Output a random digit
            for(unsigned int i=1; i<=digits; ++i)
                printf("%u ", rand()%10);

            /* Code to wait one second */
            wait_start = clock();
            for( ; clock() - wait_start < DELEY*CLOCKS_PER_SEC; );

            /* Code to overwrite the digit sequence */
            printf("\r");
            for(unsigned int i=0; i<digits; i++){
                printf("  ");
            }

            if(tries == 1)
                printf("\nNow you enter the sequence."
                        "don't forget the spaces");
            else
                printf("\r");

            /* Code to prompt for the input sequence  */


            // Reinitialize the random sequence
            srand(seed);
            for(unsigned int i=1; i<digits; i++){
                scanf(" %u", &number);
                // Compare the generated digit
                if(number != rand()%10){
                    correct = false; 
                    break;
                }
            }

            // On every third successful try, increase the sequence length
            if(correct && ((tries%3) == 0))
                ++digits;

            printf("%s\n", correct ? "Correct!" : "Wrong!");

        }

        /* Output the score when a game is finished  */
        // 计分要考虑到最长的字符串长度和所花的时间
        // 1 每个长度点记10分
        score = 10*(digits - ((tries%3) == 1));

        // 2 时间
        // 2.1 标准时间
        total_digits = digits*(((tries%3) == 0) ? 3 : tries%3);
        if(digits > 2)
            total_digits += 3*(digits*(digits - 1)/2 - 1);

        // 2.2 玩家花费时间
        game_time = (clock() - start_time)/CLOCKS_PER_SEC - tries*DELEY;

        // 每减少一秒, 加10分
        if(total_digits > game_time)
            score += 10*(total_digits - game_time);

        // clear keyboard stdin
        fflush(stdin);

        // Check if a new game is required
        printf("\nDo you want to play again? y/n: ");
        scanf(" %c", &another_game);
    }while(toupper(another_game) == 'Y');

    return 0;
}
