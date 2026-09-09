<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();

            $table->string('slug')->unique();

            $table->string('title');

            $table->string('type');

            $table->text('short_description');

            $table->text('description');

            $table->json('technologies');

            $table->json('features');

            $table->json('frontend')->nullable();

            $table->json('backend')->nullable();

            $table->json('database_tables')->nullable();

            $table->string('github')->nullable();

            $table->string('live_demo')->nullable();

            $table->boolean('is_featured')
                ->default(true);

            $table->unsignedInteger('sort_order')
                ->default(0);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
