<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cv_files', function (Blueprint $table) {
            $table->id();

            $table->string('original_name');

            $table->string('path');

            $table->unsignedBigInteger('size')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cv_files');
    }
};
