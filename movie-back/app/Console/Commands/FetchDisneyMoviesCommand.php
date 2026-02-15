<?php

namespace App\Console\Commands;

use App\Models\Movie;
use App\Services\TmdbService;
use Illuminate\Console\Command;

class FetchDisneyMoviesCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'movies:fetch-disney
                            {--pages=10 : Maximum number of pages to fetch from TMDB (20 movies per page)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch Disney animation movies from TMDB and upsert them into the movies table using tmdb_id as unique key';

    /**
     * Execute the console command.
     */
    public function handle(TmdbService $tmdbService): int
    {
        $maxPages = (int) $this->option('pages');
        $this->info("Fetching Disney animation movies from TMDB (max {$maxPages} pages)...");

        try {
            $movies = $tmdbService->fetchAllDisneyAnimationMovies($maxPages);
        } catch (\Throwable $e) {
            $this->error("Failed to fetch from TMDB: {$e->getMessage()}");
            return Command::FAILURE;
        }

        if (empty($movies)) {
            $this->warn('No movies found.');
            return Command::SUCCESS;
        }

        $this->info(count($movies).' movies found. Upserting...');

        $upserted = 0;
        $bar = $this->output->createProgressBar(count($movies));
        $bar->start();

        foreach ($movies as $tmdbMovie) {
            $data = $tmdbService->transformMovieForUpsert($tmdbMovie);
            Movie::updateOrCreate(
                ['tmdb_id' => $data['tmdb_id']],
                $data
            );
            $upserted++;
            $bar->advance();
        }

        $bar->finish();
        $this->newLine();
        $this->info("Successfully upserted {$upserted} Disney animation movies.");

        return Command::SUCCESS;
    }
}
