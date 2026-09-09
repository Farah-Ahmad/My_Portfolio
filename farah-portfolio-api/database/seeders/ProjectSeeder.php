<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        Project::updateOrCreate(
            [
                'slug' => 'smart-meeting-room',
            ],
            [
                'title' => 'Smart Meeting Room Booking System',

                'type' => 'Full Stack Web Application',

                'short_description' =>
                    'A complete meeting room reservation system designed to simplify workspace scheduling and room management.',

                'description' =>
                    'The Smart Meeting Room Booking System is a full-stack web application built to help organizations manage meeting rooms, reservations, meetings, and workspace scheduling through a responsive and user-friendly interface.',

                'technologies' => [
                    'Vue.js',
                    'Laravel',
                    'MySQL',
                    'REST API',
                    'Authentication',
                    'RBAC',
                ],

                'features' => [
                    'Room browsing and room management',
                    'Meeting room reservation system',
                    'User authentication',
                    'Role-based access control',
                    'Booking creation and management',
                    'RESTful API integration',
                    'Form validation',
                    'Error handling',
                    'Responsive user interface',
                    'CRUD operations',
                ],

                'frontend' => [
                    'Built responsive interfaces using Vue.js',
                    'Created reusable components',
                    'Implemented room browsing and reservation interfaces',
                    'Integrated frontend components with Laravel REST APIs',
                    'Handled loading, validation, and error states',
                ],

                'backend' => [
                    'Developed RESTful APIs using Laravel',
                    'Implemented authentication and authorization',
                    'Built CRUD operations for rooms and bookings',
                    'Implemented role-based access control',
                    'Handled validation and business logic',
                ],

                'database_tables' => [
                    'Users',
                    'Rooms',
                    'Reservations',
                    'Meetings',
                    'Booking Records',
                ],

                'github' => null,
                'live_demo' => null,

                'is_featured' => true,

                'sort_order' => 1,
            ]
        );


        Project::updateOrCreate(
            [
                'slug' => 'mini-wallet-api',
            ],
            [
                'title' => 'Mini Wallet API',

                'type' => 'Backend Development Project',

                'short_description' =>
                    'A REST API for wallet management including deposits, withdrawals, balances, and transaction history.',

                'description' =>
                    'Mini Wallet API is a backend system developed using Java and Spring Boot that provides wallet operations through REST endpoints while following a clean layered architecture.',

                'technologies' => [
                    'Java 17',
                    'Spring Boot',
                    'MySQL',
                    'Spring Data JPA',
                    'Hibernate',
                    'Apache Kafka',
                    'Swagger',
                    'Docker',
                    'JUnit 5',
                    'Mockito',
                ],

                'features' => [
                    'Wallet creation',
                    'Deposit operations',
                    'Withdrawal operations',
                    'Balance tracking',
                    'Transaction history',
                    'RESTful API endpoints',
                    'Kafka transaction events',
                    'Swagger API documentation',
                    'Unit testing',
                    'Docker containerization',
                ],

                'frontend' => [],

                'backend' => [
                    'Controller-Service-Repository architecture',
                    'Spring Boot REST API development',
                    'Spring Data JPA and Hibernate persistence',
                    'Kafka event publishing',
                    'Input validation and error handling',
                    'JUnit 5 and Mockito unit testing',
                ],

                'database_tables' => [
                    'Wallets',
                    'Transactions',
                    'Balances',
                ],

                'github' => null,
                'live_demo' => null,

                'is_featured' => true,

                'sort_order' => 2,
            ]
        );
    }
}
